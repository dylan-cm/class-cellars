import React, { createContext, useEffect, useState } from "react";
import { addToCart, getCart, removeFromCart, updateCartLine } from "./actions";
import { formatMerchId } from "./utilities";

interface CartContextProps {
  cart?: Cart;
  cartQuantity: number;
  isInCart: (id: string) => boolean;
  amountInCart: (id: string) => number;
  addToCart: (id: string) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  loading: boolean;
  removing?: string;
  adding?: string;
  error?: Error;
}

export const CartContext = createContext<CartContextProps>({
  cartQuantity: 0,
  isInCart: () => false,
  amountInCart: (id: string) => 0,
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

  const getLineId = (id: string) => {
    const merchandiseId = formatMerchId(id);
    if (!cart?.lines) return undefined;
    let line = cart.lines.nodes.find(
      (line) => line.merchandise.id === merchandiseId
    );
    return line;
  };

  const isInCart = (merchandiseId: string): boolean => {
    return getLineId(merchandiseId) !== undefined;
  };

  const amountInCart = (merchandiseId: string): number => {
    if (!isInCart(merchandiseId)) {
      return 0;
    }
    const line = cart?.lines?.nodes.find((node) => {
      return node.merchandise.id === formatMerchId(merchandiseId);
    });
    if (!line) return 0;
    return line.quantity;
  };

  const dispatchAdd = async (id: string) => {
    const merchandiseId = formatMerchId(id);
    if (loading || adding) return; // prevents duplicate async operations
    if (isInCart(id)) {
      const line = getLineId(id);
      if (!line) return;
      setAdding(merchandiseId);
      setError(undefined);
      try {
        const newCart: Cart = await updateCartLine(line.id, line.quantity + 1);
        setCart(newCart);
        setCartQuantity(newCart.totalQuantity);
      } catch (e: unknown) {
        setError(e as Error);
        throw new Error(e as string);
      } finally {
        setAdding(undefined);
      }
      return;
    }
    try {
      const newCart: Cart = await addToCart(merchandiseId);
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
    if (!isInCart(id)) return;
    const line = getLineId(id);
    if (!line) return;
    setRemoving(id);
    setError(undefined);
    if (line.quantity > 1) {
      try {
        const newCart: Cart = await updateCartLine(line.id, line.quantity - 1);
        setCart(newCart);
        setCartQuantity(newCart.totalQuantity);
      } catch (e: unknown) {
        setError(e as Error);
        throw new Error(e as string);
      } finally {
        setRemoving(undefined);
      }
      return;
    }
    try {
      const newCart: Cart = await removeFromCart(line.id);
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
        amountInCart,
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
