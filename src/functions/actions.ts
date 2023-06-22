import { ProductSortKeys } from "../global.d";

const SHOPIFY_API_BASE_URL =
  "https://classifiedcellars.myshopify.com/api/2023-01/graphql.json";

const CART_QUERY_OPTIONS = `buyerIdentity {
  countryCode
  customer {
    email
    displayName
    id
  }
}
checkoutUrl
updatedAt
totalQuantity
id
cost {
  subtotalAmount {
    amount
    currencyCode
  }
  totalAmount {
    amount
    currencyCode
  }
  totalTaxAmount {
    amount
    currencyCode
  }
}
createdAt
lines(first: 100) {
  nodes {
    cost {
      totalAmount {
        amount
        currencyCode
      }
    }
    id
    quantity
    merchandise {
      ... on ProductVariant {
        id
        product {
          description
          featuredImage {
            altText
            id
            url(transform: {maxHeight: 400, maxWidth: 400})
          }
          handle
          id
          productType
          title
          totalInventory
        }
        availableForSale
        currentlyNotInStock
        quantityAvailable
        price {
          amount
          currencyCode
        }
      }
    }
  }
  pageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
}`;

const shopifyFetch = async (query: string) => {
  return await fetch(SHOPIFY_API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.REACT_APP_X_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
    },
    body: JSON.stringify({ query }),
  });
};

export const fetchProducts = async ({
  back,
  cursor,
  amount,
  productType,
  reverse,
  sortKey,
  ...props
}: {
  amount: number;
  descriptionTruncate: number;
  cursor?: string;
  back?: boolean;
  productType?: string;
  sortKey?: ProductSortKeys;
  reverse?: boolean;
}): Promise<FetchProductsResponse> => {
  const query = `
    query {
      products(
        first: ${!back ? amount : "null"},
        last: ${back ? amount : "null"},
        after: ${!back && cursor ? `"${cursor}"` : "null"},
        before: ${back && cursor ? `"${cursor}"` : "null"},
        query: "product_type:${productType || "*"}",
        sortKey: ${sortKey || "null"},
        reverse: ${reverse ? "true" : "false"},
      ) {
        nodes {
          handle
          title
          id
          productType
          availableForSale
          description(truncateAt: ${props.descriptionTruncate})
          featuredImage {
            url
            altText
          }
          variants(first: 1) {
            nodes {
              id
              quantityAvailable
              price {
                amount
                currencyCode
              }
            }
          }
        }
        pageInfo {
          startCursor
          hasPreviousPage
          hasNextPage
          endCursor
        }
      }
    }
  `;
  const response = await shopifyFetch(query);
  const responseBody: {
    data: {
      products: {
        nodes: Product[];
        pageInfo: PageInfo;
      };
    };
    errors: any[];
  } = await response.json();

  if (responseBody.errors) {
    throw new Error(`
      Failed to fetch products.
      [${response.status}]: ${response.statusText}
      ${JSON.stringify(responseBody.errors)}
    `);
  }

  return {
    products: responseBody.data.products.nodes,
    pageInfo: responseBody.data.products.pageInfo,
  };
};

export const addCustomer = async (email: string) => {
  const functionUrl =
    "https://us-central1-casadelsol-6dae6.cloudfunctions.net/addCustomer";

  try {
    const response = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem("customerId", data.id);

    return response.status;
  } catch (error) {
    console.error("Failed to create customer:", error);
  }
};

const createCart = async (input?: any): Promise<Cart> => {
  const query = `
    mutation {
      cartCreate${!input ? "" : `(input: ${JSON.stringify(input)})`} {
        cart {
          id
          updatedAt
          createdAt
          totalQuantity
          checkoutUrl
          buyerIdentity {
            customer {
              id
            }
          }
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;

  const response = await shopifyFetch(query);
  const responseBody: {
    data: { cartCreate: { cart: Cart; userErrors: ShopifyErr[] } };
  } = await response.json();

  if (!responseBody?.data)
    throw new Error(
      `request error: [${response.status}]: ${response.statusText}`
    );
  if (responseBody?.data?.cartCreate?.userErrors.length > 0)
    throw new Error(`api error: ${responseBody?.data?.cartCreate?.userErrors}`);
  if (!responseBody?.data?.cartCreate?.cart?.checkoutUrl)
    throw new Error(`No checkout url provided`);
  if (!responseBody?.data?.cartCreate?.cart?.id)
    throw new Error(`No cart ID provided`);

  localStorage.setItem("cartId", responseBody?.data?.cartCreate.cart.id);
  localStorage.setItem(
    "checkoutUrl",
    responseBody?.data?.cartCreate.cart?.checkoutUrl
  );

  return responseBody?.data?.cartCreate.cart;
};

export const removeFromCart = async (lineId: string): Promise<Cart> => {
  var cartId = localStorage.getItem("cartId");
  if (!cartId) {
    throw new Error("No cart exists. Cannot Remove item");
  }

  const getCartQuery = `
  query {
    cart(id: "${cartId}") {
      lines(first: 100) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

  let cartResponse = await shopifyFetch(getCartQuery);
  let cartResponseBody: {
    data: {
      cart: {
        lines: {
          edges: {
            node: {
              id: string;
            };
          }[];
        };
      };
    };
  } = await cartResponse.json();
  let merchandiseInCart =
    cartResponseBody?.data?.cart?.lines?.edges?.map((edge) => edge.node.id) ||
    [];

  if (!merchandiseInCart.includes(lineId)) {
    throw new Error("Merchandise is not in the cart");
  }

  const query = `
    mutation  {
      cartLinesRemove(lineIds: ["${lineId}"], cartId: "${cartId}") {
        cart {
          ${CART_QUERY_OPTIONS}
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;

  const response = await shopifyFetch(query);
  const responseBody: {
    data: { cartLinesRemove: { cart: Cart; userErrors: ShopifyErr[] } };
    errors: any[];
  } = await response.json();

  if (!responseBody?.data)
    throw new Error(
      `request error: 
      response:${JSON.stringify(response)}
      responseBody: ${JSON.stringify(responseBody.errors)}
      `
    );
  if (responseBody?.data?.cartLinesRemove?.userErrors.length > 0) {
    console.log(
      `api error: ${JSON.stringify(
        responseBody?.data?.cartLinesRemove?.userErrors
      )}`,
      "creating new cart and trying to refreshing page again"
    );
    const updatedCart = await createCart();
    return updatedCart;
  }
  if (!responseBody?.data?.cartLinesRemove?.cart?.checkoutUrl)
    throw new Error(`No checkout url provided`);
  if (!responseBody?.data?.cartLinesRemove?.cart?.id)
    throw new Error(`No cart ID provided`);

  return responseBody.data.cartLinesRemove.cart;
};

export const addToCart = async (merchandiseId: string): Promise<Cart> => {
  var cartId = localStorage.getItem("cartId");
  if (!cartId) {
    cartId = (await createCart()).id;
    if (!createCart) throw new Error("No cart id");
  }

  const getCartQuery = `
  query {
    cart(id: "${cartId}") {
      lines(first: 100) {
        edges {
          node {
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
    }
  }
`;

  let cartResponse = await shopifyFetch(getCartQuery);
  let cartResponseBody: {
    data: {
      cart: {
        lines: {
          edges: {
            node: {
              merchandise: {
                id: string;
              };
            };
          }[];
        };
      };
    };
  } = await cartResponse.json();
  let merchandiseInCart =
    cartResponseBody?.data?.cart?.lines?.edges?.map(
      (edge) => edge.node.merchandise.id
    ) || [];

  if (merchandiseInCart.includes(merchandiseId)) {
    throw new Error(`Merchandise is already in the cart: ${merchandiseId}`);
  }

  const query = `
    mutation  {
      cartLinesAdd(lines: {merchandiseId: "${merchandiseId}"}, cartId: "${cartId}") {
        cart {
          ${CART_QUERY_OPTIONS}
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;

  const response = await shopifyFetch(query);
  const responseBody: {
    data: { cartLinesAdd: { cart: Cart; userErrors: ShopifyErr[] } };
    errors: any[];
  } = await response.json();

  if (!responseBody?.data)
    throw new Error(
      `request error: 
      response:${JSON.stringify(response)}
      responseBody: ${JSON.stringify(responseBody.errors)}
      `
    );
  if (responseBody?.data?.cartLinesAdd?.userErrors.length > 0) {
    console.log(
      `api error: ${JSON.stringify(
        responseBody?.data?.cartLinesAdd?.userErrors
      )}`,
      "creating new cart and trying to add again"
    );
    await createCart();
    return await addToCart(merchandiseId);
  }
  if (!responseBody?.data?.cartLinesAdd?.cart?.checkoutUrl) {
    throw new Error(`No checkout url provided`);
  }
  if (!responseBody?.data?.cartLinesAdd?.cart?.id)
    throw new Error(`No cart ID provided`);

  return responseBody?.data?.cartLinesAdd.cart;
};

export const getCart = async (givenCartId?: string): Promise<Cart> => {
  var cartId: string | null | undefined = givenCartId;
  if (!cartId) cartId = localStorage.getItem("cartId");
  if (!cartId) {
    const newCart = await createCart();
    cartId = newCart.id;
    if (!cartId) throw new Error("No cart id");
  }

  const query = `
    query {
      cart(id: "${cartId}") {
        ${CART_QUERY_OPTIONS}
      }
    }
  `;

  const response = await shopifyFetch(query);
  const responseBody: {
    data: { cart: Cart };
  } = await response.json();
  if (!responseBody?.data?.cart?.id || !responseBody?.data?.cart?.checkoutUrl) {
    console.log(
      `[${response.status}]: ${response.statusText}
      Failed to fetch cart.`
    );
    return await createCart();
  }

  return responseBody.data.cart;
};

export const getProduct = async (productId?: string, handle?: boolean) => {
  const query = `
    query {
      product(${handle ? "handle" : "id"}: "${productId}") {
        metafields(identifiers: [{namespace: "custom", key: "region"}, {namespace: "custom", key: "grapes"}, {namespace: "custom", key: "year"}, {namespace: "custom", key: "volume"}, {namespace: "custom", key:"package"}]) {
          value
          key
        }
        handle
        title
        id
        productType
        availableForSale
        description
        featuredImage {
          url
          altText
        }
        variants(first: 1) {
          nodes {
            id
            quantityAvailable
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;
  const response = await shopifyFetch(query);
  const responseBody: {
    data: { product: Product };
  } = await response.json();
  if (!responseBody?.data?.product?.id) {
    throw new Error(
      `
      Failed to fetch product.
      [${response.status}]: ${JSON.stringify(responseBody)}
      `
    );
  }

  return responseBody.data.product;
};

export const getProductTypes = async (): Promise<string[]> => {
  const query = `
  query {
    productTypes(first: 100) {
      edges {
        node
      }
    }
  }`;

  const response = await shopifyFetch(query);
  const responseBody: any = await response.json();

  if (responseBody.errors) {
    throw new Error(`
      Failed to fetch product types.
      [${response.status}]: ${response.statusText}
      ${responseBody.errors}
    `);
  }

  var productTypes: string[] = [];
  responseBody.data.productTypes.edges.forEach((productType: any) =>
    productTypes.push(productType.node)
  );

  return productTypes;
};

export const updateCartLine = async (
  lineId: string,
  quantity: number
): Promise<Cart> => {
  var cartId = localStorage.getItem("cartId");
  if (!cartId) {
    throw new Error("No cart exists. Cannot Remove item");
  }

  const query = `
    mutation  {
      cartLinesUpdate(cartId: "${cartId}", lines: {id: "${lineId}", quantity: ${quantity}}) {
        cart {
          ${CART_QUERY_OPTIONS}
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;

  const response = await shopifyFetch(query);
  const responseBody: {
    data: { cartLinesUpdate: { cart: Cart; userErrors: ShopifyErr[] } };
    errors: any[];
  } = await response.json();

  if (!responseBody?.data)
    throw new Error(
      `request error: 
      response:${JSON.stringify(response)}
      responseBody: ${JSON.stringify(responseBody.errors)}
      `
    );
  if (responseBody?.data?.cartLinesUpdate?.userErrors.length > 0)
    throw new Error(
      `api error: ${responseBody?.data?.cartLinesUpdate?.userErrors}`
    );
  if (!responseBody?.data?.cartLinesUpdate?.cart?.checkoutUrl)
    throw new Error(`No checkout url provided`);
  if (!responseBody?.data?.cartLinesUpdate?.cart?.id)
    throw new Error(`No cart ID provided`);

  return responseBody.data.cartLinesUpdate.cart;
};
