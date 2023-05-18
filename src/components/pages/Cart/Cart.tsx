import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useFetchCart } from "../../../functions/hooks";
import LoadingDisplay from "../../../functions/LoadingDisplay";
import EmptyCart from "../../molecules/EmptyCart/EmptyCart";
import ErrorDisplay from "../../molecules/ErrorDisplay/ErrorDisplay";
import { formatMoney } from "../../../functions/utilities";
import { removeFromCart } from "../../../functions/actions";

interface CartProps {}

const Cart = ({ ...props }: CartProps) => {
  const { fetchedCart, isFetching, error } = useFetchCart();
  const [cart, setCart] = useState<Cart | undefined>();

  useEffect(() => setCart(fetchedCart), [fetchedCart]);

  if (isFetching) {
    return <LoadingDisplay />; // Use Loading component
  }

  if (error) {
    return <ErrorDisplay message={error.message} />; // Use Error component
  }

  if (!cart || cart.totalQuantity === 0) {
    return <EmptyCart />; // Use EmptyCart component
  }

  const handleRemoveFromCart = async (lineId: string) => {
    const updatedCart = await removeFromCart(lineId);
    console.log("updatedCart", updatedCart);
    setCart(updatedCart);
  };

  return (
    <div className="Cart">
      <h2>Your Cart</h2>
      {cart?.lines?.nodes.map((node) => {
        const lineId = node.id;
        return (
          <div key={node.merchandise.id} className="CartItem">
            <div className="CartItemDetails">
              <p>{node.merchandise.product?.title}</p>
              <p>
                {formatMoney({
                  amount: node.merchandise.price.amount,
                  currencyCode: node.merchandise.price.currencyCode,
                })}
              </p>
            </div>
            <button onClick={() => handleRemoveFromCart(lineId)}>
              Remove from Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
