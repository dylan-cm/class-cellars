import React, { createContext, useState, useEffect, useCallback } from "react";
import { useFetchCart } from "../../../functions/hooks";
import { getCart } from "../../../functions/actions";

// Create the Shopify Cart Context
export const ShopifyCartContext = createContext<{
  fetchedCart: Cart | undefined;
  refreshCart: () => Promise<Cart | undefined>;
  isFetching: boolean;
  error: Error | null;
}>({
  fetchedCart: undefined,
  refreshCart: async () => undefined,
  isFetching: false,
  error: null,
});

// Shopify Cart Provider
export const ShopifyCartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<Cart | undefined>();
  // const { fetchedCart, isFetching, error } = useFetchCart();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshCart = useCallback(async () => {
    console.log("refreshCart called");
    try {
      setIsFetching(true);
      const fetchedCart = await getCart();
      console.log("fetchedCart", fetchedCart);
      setCart(fetchedCart);
      return fetchedCart;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    // if (!isFetching) refreshCart();
    console.log("isFetching", isFetching);
  }, [refreshCart, isFetching]);

  return (
    <ShopifyCartContext.Provider
      value={{ fetchedCart: cart, refreshCart, isFetching, error }}
    >
      {children}
    </ShopifyCartContext.Provider>
  );
};
