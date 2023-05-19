const SHOPIFY_API_BASE_URL =
  "https://classifiedcellars.myshopify.com/api/2023-01/graphql.json";
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
  ...props
}: {
  amount: number;
  descriptionTruncate: number;
  cursor?: string;
  back?: boolean;
}): Promise<FetchProductsResponse> => {
  const query = `
    query {
      products(${props.back ? "last" : "first"}: ${props.amount}${
    props.cursor
      ? `, ${props.back ? "before" : "after"}: "${props.cursor}"`
      : ""
  }) {
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

  const responseBody: ProductsResponseBody =
    (await response.json()) as ProductsResponseBody;

  if (responseBody.errors) {
    throw new Error("Failed to fetch products");
  }
  return {
    products: responseBody.data.products.nodes,
    pageInfo: responseBody.data.products.pageInfo,
  };
};

//? export const createCustomerAccessToken = async () => {

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
    //todo: save customer id in local storage
    //todo: get full response
    console.log("data", data);

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

  localStorage.setItem(
    "cartQty",
    responseBody.data.cartCreate.cart.totalQuantity.toString()
  );

  return responseBody?.data?.cartCreate.cart;
};

//? export const createCheckout = async (): Promise<string | null> => {
//   const query = `
//     mutation {
//       checkoutCreate(input: {}) {
//         checkout {
//           id
//         }
//         checkoutUserErrors {
//           code
//           field
//           message
//         }
//       }
//     }
//   `;

//   const response = await fetch(SHOPIFY_API_BASE_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Shopify-Storefront-Access-Token": "your-storefront-access-token",
//     },
//     body: JSON.stringify({ query }),
//   });

//   const responseBody: {
//     data?: {
//       checkoutCreate: {
//         checkout: {
//           id: string;
//         };
//         checkoutUserErrors: {
//           code: string;
//           field: string[];
//           message: string;
//         }[];
//       };
//     };
//     errors?: { message: string }[];
//   } = await response.json();

//   if (
//     responseBody.errors ||
//     responseBody.data?.checkoutCreate?.checkoutUserErrors?.length
//   ) {
//     throw new Error("Failed to create checkout");
//   }

//   return responseBody.data?.checkoutCreate?.checkout?.id || null;
// };

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
          buyerIdentity {
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
                  }
                  availableForSale
                  currentlyNotInStock
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
  if (responseBody?.data?.cartLinesRemove?.userErrors.length > 0)
    throw new Error(
      `api error: ${responseBody?.data?.cartLinesRemove?.userErrors}`
    );
  if (!responseBody?.data?.cartLinesRemove?.cart?.checkoutUrl)
    throw new Error(`No checkout url provided`);
  if (!responseBody?.data?.cartLinesRemove?.cart?.id)
    throw new Error(`No cart ID provided`);

  localStorage.setItem(
    "cartQty",
    responseBody.data.cartLinesRemove.cart.totalQuantity.toString()
  );

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
    throw new Error("Merchandise is already in the cart");
  }

  const query = `
    mutation  {
      cartLinesAdd(lines: {merchandiseId: "${merchandiseId}"}, cartId: "${cartId}") {
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
  if (responseBody?.data?.cartLinesAdd?.userErrors.length > 0)
    throw new Error(
      `api error: ${responseBody?.data?.cartLinesAdd?.userErrors}`
    );
  if (!responseBody?.data?.cartLinesAdd?.cart?.checkoutUrl)
    throw new Error(`No checkout url provided`);
  if (!responseBody?.data?.cartLinesAdd?.cart?.id)
    throw new Error(`No cart ID provided`);

  localStorage.setItem(
    "cartQty",
    responseBody.data.cartLinesAdd.cart.totalQuantity.toString()
  );
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
        buyerIdentity {
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
                }
                availableForSale
                currentlyNotInStock
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
        }
      }
    }
  `;

  const response = await shopifyFetch(query);
  const responseBody: {
    data: { cart: Cart };
  } = await response.json();
  if (!responseBody?.data?.cart?.id || !responseBody?.data?.cart?.checkoutUrl) {
    throw new Error(
      `[${response.status}]: ${response.statusText}
      Failed to fetch cart.`
    );
  }

  localStorage.setItem(
    "cartQty",
    responseBody.data.cart.totalQuantity.toString()
  );

  return responseBody.data.cart;
};

export const getProduct = async (productId?: string, handle?: boolean) => {
  const query = `
    query {
      product(${handle ? "handle" : "id"}: "${productId}") {
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
      [${response.status}]: ${responseBody}
      `
    );
  }

  return responseBody.data.product;
};
