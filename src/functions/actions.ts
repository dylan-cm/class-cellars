export const addToCart = async (productId: string) => {
  console.log("add to cart", productId); //TODO: add to cart
};

export const submitEmail = async (email: string) => {
  console.log("email", email);
};

interface fetchProductsOptions {
  amount: number;
  descriptionTruncate: number;
}

export const fetchProducts = async ({
  amount,
  descriptionTruncate,
}: fetchProductsOptions): Promise<Product[]> => {
  const query = `
    query {
      products(first: ${amount}) {
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
              }
              quantityAvailable
            }
          }
          title
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

  const responseBody: ResponseBody = (await response.json()) as ResponseBody;

  if (responseBody.errors) {
    console.error("Failed to fetch products:", responseBody.errors);
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = responseBody.data.products.nodes.map(
    (node: any) => {
      const variant = node.variants.nodes[0];
      return {
        title: node.title,
        description: variant.product.description,
        price: variant.price.amount,
        img: variant.product.featuredImage.url,
        id: variant.id,
      };
    }
  );

  return products;
};
