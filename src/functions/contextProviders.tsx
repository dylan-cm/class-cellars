import React, { createContext, useEffect, useState } from "react";
import { addToCart, getCart, removeFromCart } from "./actions";

interface CartContextProps {
  cart?: Cart;
  cartQuantity: number;
  isInCart: (id: string) => string | undefined;
  addToCart: (id: string) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  loading: boolean;
  removing?: string;
  adding?: string;
  error?: Error;
}

export const CartContext = createContext<CartContextProps>({
  cartQuantity: 0,
  isInCart: () => undefined,
  addToCart: async (id: string) =>
    console.log(`No cart found, did not add ${id} to cart`),
  removeFromCart: async (id: string) =>
    console.log(`No cart found, did not remove ${id} from cart`),
  loading: false,
});

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart | undefined>();
  const [cartQuantity, setCartQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState<string | undefined>(undefined);
  const [adding, setAdding] = useState<string | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>();

  const initialFetch = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const newCart = await getCart();
      setCart(newCart);
      setCartQuantity(newCart.totalQuantity);
    } catch (e: unknown) {
      setError(e as Error);
      throw new Error(e as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialFetch();
  }, []);

  const isInCart = (id: string) => {
    if (!cart?.lines) return undefined;
    return cart.lines.nodes.find((line) => line.merchandise.id === id)?.id;
  };

  const dispatchAdd = async (id: string) => {
    if (loading || adding) return; // prevents duplicate async operations
    if (isInCart(id)) return;
    setAdding(id);
    setError(undefined);
    try {
      const newCart: Cart = await addToCart(id);
      setCart(newCart);
      setCartQuantity(newCart.totalQuantity);
    } catch (e: unknown) {
      setError(e as Error);
      throw new Error(e as string);
    } finally {
      setAdding(undefined);
    }
  };

  const dispatchRemove = async (id: string) => {
    if (loading || removing) return; // prevents duplicate async operations
    if (!cart?.lines?.nodes.find((line) => line.id === id)) return;
    setRemoving(id);
    setError(undefined);
    try {
      const newCart: Cart = await removeFromCart(id);
      setCart(newCart);
      setCartQuantity(newCart.totalQuantity);
    } catch (e: unknown) {
      setError(e as Error);
      throw new Error(e as string);
    } finally {
      setRemoving(undefined);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartQuantity,
        isInCart,
        addToCart: (id: string) => dispatchAdd(id),
        removeFromCart: (id: string) => dispatchRemove(id),
        loading,
        removing,
        adding,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
