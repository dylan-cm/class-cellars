export {};

declare global {
  export interface Product {
    title: string;
    description: string;
    price: string;
    img: string;
    id: string;
  }

  interface ResponseBody {
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
              };
              quantityAvailable: number;
            }[];
          };
          title: string;
        }[];
      };
    };
    errors?: any[];
  }
}
