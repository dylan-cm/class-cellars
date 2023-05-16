export const addToCart = async (productId: string) => {
  console.log("add to cart", productId); //TODO: add to cart
};

export const submitEmail = async (email: string) => {
  console.log("email", email);
};

interface fetchProductsOptions {
  amount: number;
  descriptionTruncate: number;
  cursor?: string;
  back?: boolean;
}

interface fetchProductsResponse {
  fetchedProducts: Product[];
  newStartCursor: string;
  newEndCursor: string;
  newHasNextPage: boolean;
  newHasPreviousPage: boolean;
}

export const fetchProducts = async ({
  amount,
  descriptionTruncate,
  cursor,
  back,
}: fetchProductsOptions): Promise<fetchProductsResponse> => {
  const query = `
    query {
      products(${back ? "last" : "first"}: ${amount}${
    cursor ? `, ${back ? "before" : "after"}: "${cursor}"` : ""
  }) {
        nodes {
          variants(first: 1) {
            nodes {
              price {
                amount
                currencyCode
              }
              id
              product {
                description(truncateAt: ${descriptionTruncate})
                featuredImage {
                  url
                }
                availableForSale
                productType
              }
              quantityAvailable
            }
          }
          title
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

  const response = await fetch(
    "https://classifiedcellars.myshopify.com/api/2023-01/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.REACT_APP_X_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
      },
      body: JSON.stringify({
        query,
      }),
    }
  );

  const responseBody: ProductsResponseBody =
    (await response.json()) as ProductsResponseBody;

  if (responseBody.errors) {
    console.error("Failed to fetch products:", responseBody.errors);
    throw new Error("Failed to fetch products");
  }
  //todo: add default pictures based off of type of wine (red, white, etc)
  const fetchedProducts: Product[] = responseBody.data.products.nodes.map(
    (node: any) => {
      const variant = node.variants.nodes[0];
      return {
        title: node.title,
        description: variant.product.description,
        price: variant.price.amount,
        img:
          variant.product.featuredImage?.url || "https://picsum.photos/200/240",
        id: variant.id,
        type: variant.product.productType,
      };
    }
  );

  const newStartCursor = responseBody.data.products.pageInfo.startCursor;
  const newEndCursor = responseBody.data.products.pageInfo.endCursor;
  const newHasNextPage = responseBody.data.products.pageInfo.hasNextPage;
  const newHasPreviousPage =
    responseBody.data.products.pageInfo.hasPreviousPage;

  return {
    fetchedProducts,
    newStartCursor,
    newEndCursor,
    newHasNextPage,
    newHasPreviousPage,
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

    return response.status;
  } catch (error) {
    console.error("Failed to create customer:", error);
  }
};
