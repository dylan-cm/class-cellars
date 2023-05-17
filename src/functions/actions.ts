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
          title
          id
          productType
          availableForSale
          description(truncateAt: ${props.descriptionTruncate})
          featuredImage {
            url
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
          cost: {
            subTotalAmount {
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
    cart: Cart;
    userErrors: ShopifyErr;
  } = await response.json();
  if (
    responseBody?.userErrors ||
    !responseBody?.cart?.id ||
    !responseBody?.cart?.checkoutUrl
  ) {
    throw new Error(
      `[${response.status}]: ${response.statusText}
      Failed to create cart: ${JSON.stringify(responseBody.userErrors)}`
    );
  }

  return responseBody.cart;
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

export const addToCart = async (merchandiseId: string): Promise<Cart> => {
  var cartId = localStorage.getItem("cartId");
  if (!cartId) {
    cartId = (await createCart()).id;
    if (!createCart) throw new Error("No cart id");
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
          cost: {
            subTotalAmount {
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
    cart: Cart;
    userErrors: ShopifyErr;
  } = await response.json();
  if (
    responseBody?.userErrors ||
    !responseBody?.cart?.id ||
    !responseBody?.cart?.checkoutUrl
  ) {
    throw new Error(
      `[${response.status}]: ${response.statusText}
      Failed to add to cart: ${JSON.stringify(responseBody.userErrors)}`
    );
  }

  return responseBody.cart;
};

export const getCart = async ({
  ...props
}: {
  cartId?: string;
}): Promise<Cart> => {
  var cartId: string | null | undefined = props.cartId;
  if (!cartId) cartId = localStorage.getItem("cartId");
  if (!cartId) {
    cartId = (await createCart()).id;
    if (!createCart) throw new Error("No cart id");
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
    cart: Cart;
  } = await response.json();
  if (!responseBody?.cart?.id || !responseBody?.cart?.checkoutUrl) {
    throw new Error(
      `[${response.status}]: ${response.statusText}
      Failed to fetch cart.`
    );
  }

  return responseBody.cart;
};
