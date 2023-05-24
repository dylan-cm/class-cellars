import { useEffect, useState } from "react";
import { getCart } from "./actions";

export const useFetchCart = () => {
  const [cart, setCart] = useState<Cart | undefined>();
  const [refreshRequired, setRefreshRequired] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCart = async () => {
    try {
      const fetchedCart = await getCart();
      setCart(fetchedCart);
      setIsFetching(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setIsFetching(false);
      setRefreshRequired(false);
    }
  };

  const refetch = () => {
    setRefreshRequired(true);
  };

  useEffect(() => {
    if (!isFetching && refreshRequired) {
      fetchCart();
    }
  }, [isFetching, refreshRequired]);

  return { fetchedCart: cart, isFetching, error, refetch };
};
