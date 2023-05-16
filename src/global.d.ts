export {};

declare global {
  export interface Product {
    title: string;
    description: string;
    price: string;
    img: string;
    id: string;
    type: string;
  }

  interface ProductsResponseBody {
    data: {
      products: {
        nodes: {
          variants: {
            nodes: {
              price: {
                amount: string;
                currencyCode: string;
              };
              id: string;
              product: {
                description: string;
                featuredImage: {
                  url: string;
                };
                availableForSale: boolean;
                productType: string;
              };
              quantityAvailable: number;
            }[];
          };
          title: string;
        }[];
        pageInfo: {
          startCursor: string;
          hasPreviousPage: boolean;
          hasNextPage: boolean;
          endCursor: string;
        };
      };
    };
    errors?: any[];
  }
}
