export enum ProductSortKeys {
  BEST_SELLING = "BEST_SELLING",
  CREATED_AT = "CREATED_AT",
  ID = "ID",
  PRICE = "PRICE",
  PRODUCT_TYPE = "PRODUCT_TYPE",
  RELEVANCE = "RELEVANCE",
  TITLE = "TITLE",
  UPDATED_AT = "UPDATED_AT",
  VENDOR = "VENDOR",
}

declare global {
  //*** Algolia Search */
  export interface Hit {
    title: string;
    price: number;
    qty: number;
    updated: Date;
    id: string;
    type: string;
    region: string;
    volume: number;
    package: number;
    year: number;
    grapes: string;
    handle: string;
    img?: string;
  }

  //shopify 2023-01 storefront api
  //*** API Calls */
  export interface FetchProductsResponse {
    products: Product[];
    pageInfo: PageInfo;
  }
  export interface ProductsResponseBody {
    data: {
      products: {
        nodes: Product[];
        pageInfo: PageInfo;
      };
    };
    errors?: any[];
  }

  //*** Shopify Objects */
  export interface ShopifyImage {
    id: string;
    url: string;
    transform?: {
      maxHeight: number;
      maxWidth: number;
    };
    altText?: string;
  }
  export interface ProductVariant {
    id: string;
    price: Money;
    image?: ShopifyImage;
    availableForSale: boolean;
    currentlyNotInStock: boolean;
    product?: Product;
    quantityAvailable: number;
  }
  export interface Product {
    id: string;
    title: string;
    handle: string;
    description: string;
    featuredImage: ShopifyImage;
    productType: string;
    variants?: {
      nodes: ProductVariant[];
      pageInfo: PageInfo;
    };
    totalInventory?: number;
    metafields?: { value: string; key: string }[];
  }
  export interface PageInfo {
    startCursor: string;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    endCursor: string;
  }
  export interface ShippingRate {
    handle: string;
    price: Money;
    title: string;
  }

  export interface CheckoutLineItem {
    id: string;
    quantity: number;
    title: string;
    unitPrice?: MoneyV2;
    variant: ProductVariant;
  }
  export interface Checkout {
    id: string;
    webUrl: string;
    shippingAddress?: MailingAddress;
    availableShippingRates: {
      ready: boolean;
      shippingRates?: ShippingRate[];
    };
    shippingLine?: ShippingRate;
    subtotalPrice: Money;
    lineItemsSubtotalPrice: Money;
    totalTax: Money;
    totalPrice: Money;
    paymentDue: Money;
    orderStatusUrl?: string;
    order?: Order;
    lineItems: {
      nodes: CheckoutLineItem[];
      pageInfo: PageInfo;
    };
    updatedAt: string;
    createdAt: string;
    completedAt: string;
    ready: boolean;
    email?: string;
    currencyCode: string;
    buyerIdentity: {
      customer: Customer;
      countryCode: string;
    };
  }

  export interface Customer {
    id: string;
    email?: string;
    acceptsMarketing?: boolean;
    firstName?: string;
    lastName?: string;
    phone?: string;
    defaultAddress?: MailingAddress;
    addresses?: MailingAddress[];
    createdAt: string;
    updatedAt: string;
    numberOfOrders?: number;
    lastIncompleteCheckout?: Checkout;
    orders?: Order[];
  }

  export interface ShopifyErr {
    code?: string;
    field?: string[];
    message: string;
  }

  export interface Money {
    amount: string | number;
    currencyCode: string;
  }
  export interface CartLine {
    cost: {
      totalAmount: Money;
    };
    id: string;
    merchandise: ProductVariant;
    quantity: number;
  }
  export interface Cart {
    id: string;
    checkoutUrl: string;
    updatedAt: string;
    createdAt: string;
    totalQuantity: number;
    cost: {
      subtotalAmount: Money;
      totalTaxAmount: Money;
      totalAmount: Money;
    };
    buyerIdentity: {
      customer?: Customer;
      countryCode?: string;
    };
    lines?: {
      nodes: CartLine[];
      pageInfo: PageInfo;
    };
  }

  export interface Order {
    id: string;
    name: string;
    orderNumber: string;
    cancelReason?: string;
    canceledAt?: string;
    currencyCode: string;
    currentSubtotalPrice: Money;
    currentTotalTax: Money;
    currentTotalPrice: Money;
    customerLocale?: string;
    customerUrl?: string;
    edited: boolean;
    email?: string;
    phone?: string;
    originalTotalPrice: Money;
    fulfillmentStatus: string;
    financialStatus: string;
    processedAt: string;
    shippingAddress: MailingAddress;
    subtotalPrice?: Money;
    totalPrice: Money;
    totalRefunded: Money;
    totalShippingPrice: Money;
    totalTax?: Money;
  }

  export interface MailingAddress {
    address1?: string;
    address2?: string;
    city?: string;
    company?: string;
    country?: string;
    countryCodeV2?: string;
    firstName?: string;
    formatted: string[];
    formattedArea?: string;
    id: string;
    lastName?: string;
    latitude?: number;
    longitude?: number;
    name?: string;
    phone?: string;
    province?: string;
    provinceCode?: string;
    zip?: string;
  }
}
