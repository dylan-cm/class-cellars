import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useFetchCart } from "../../../functions/hooks";
import LoadingDisplay from "../../../functions/LoadingDisplay";
import EmptyCart from "../../molecules/EmptyCart/EmptyCart";
import ErrorDisplay from "../../molecules/ErrorDisplay/ErrorDisplay";
import { formatMoney } from "../../../functions/utilities";
import { removeFromCart } from "../../../functions/actions";
import { BeatLoader } from "react-spinners";

interface CartProps {}

const PLACEHOLDER_THUMBNAIL =
  "https://placeholder.pics/svg/400x480/A6323B-4F0B41/FFFFFF-000000";

const Cart = ({ ...props }: CartProps) => {
  const { fetchedCart, isFetching, error } = useFetchCart();
  const [cart, setCart] = useState<Cart | undefined>();
  const [loading, setLoading] = useState<string | undefined>();

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
    setLoading(lineId);
    if (loading) return;
    const updatedCart = await removeFromCart(lineId);
    setLoading(undefined);
    setCart(updatedCart);
  };

  const goToCheckout = () => {
    console.log("gotocheckout");
  };

  return (
    <div className="Cart">
      <div className="Row">
        <div className="TitleArea">
          <h1>Cart</h1>
          <h6>Wonderful additions to your collection await!</h6>
        </div>
        <div className="Overview">
          <h3>Subtotal: $500.00</h3>
          <div className="CheckoutButton" onClick={() => goToCheckout()}>
            Checkout
          </div>
        </div>
      </div>
      <div className="Wrapper">
        {cart?.lines?.nodes.map((node) => {
          const lineId = node.id;
          return (
            <div key={node.merchandise.id} className="CartItem">
              <div className="Left">
                <img
                  src={
                    node.merchandise.product?.featuredImage?.url ||
                    PLACEHOLDER_THUMBNAIL
                  }
                  alt={
                    node.merchandise.product?.featuredImage?.altText ||
                    node.merchandise.product?.handle
                  }
                />
                <p>{node.merchandise.product?.title}</p>
              </div>
              <div className="CartItemDetails">
                <p>
                  {formatMoney({
                    amount: node.merchandise.price.amount,
                    currencyCode: node.merchandise.price.currencyCode,
                  })}
                </p>
                <button
                  onClick={() => handleRemoveFromCart(lineId)}
                  className={loading === lineId ? "RemoveLoading" : ""}
                >
                  {loading === lineId ? (
                    <BeatLoader
                      size={8}
                      color={"#ffffff"}
                      loading={loading === lineId}
                    />
                  ) : (
                    "Remove"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
