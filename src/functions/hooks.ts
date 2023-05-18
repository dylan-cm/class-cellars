import { useEffect, useState } from "react";
import { getCart } from "./actions";

export const useFetchCart = () => {
  const [cart, setCart] = useState<Cart | undefined>();
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null); // New state

  useEffect(() => {
    if (!hasFetched && !isFetching) {
      setIsFetching(true);
      const fetchCart = async () => {
        try {
          const fetchedCart = await getCart();
          setCart(fetchedCart);
          setHasFetched(true);
          // throw new Error("test error"); //for dev testing only
        } catch (err) {
          if (err instanceof Error) {
            setError(err);
          } else {
            setError(new Error("An unknown error occurred"));
          }
        } finally {
          setIsFetching(false);
        }
      };

      fetchCart();
    }
  }, [hasFetched, isFetching]);

  return { fetchedCart: cart, isFetching, error }; // Return error state
};
