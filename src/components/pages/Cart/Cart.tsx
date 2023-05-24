import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import LoadingDisplay from "../../atoms/LoadingDisplay";
import EmptyCart from "../../molecules/EmptyCart/EmptyCart";
import ErrorDisplay from "../../molecules/ErrorDisplay/ErrorDisplay";
import { defaultImage, formatMoney } from "../../../functions/utilities";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../functions/contextProviders";
import { MdOutlineOpenInNew } from "react-icons/md";

interface CartProps {}

const Cart = ({ ...props }: CartProps) => {
  const cartContext = useContext(CartContext);
  const [cart, setCart] = useState<Cart | undefined>(undefined);

  useEffect(() => {
    setCart(cartContext.cart);
  }, [cartContext.cart]);

  const navigate = useNavigate();

  if (!cart) {
    return <LoadingDisplay />; // Use Loading component
  }

  if (cartContext.error) {
    return <ErrorDisplay message={cartContext.error.message} />; // Use Error component
  }

  if (cartContext.cartQuantity === 0) {
    return <EmptyCart />; // Use EmptyCart component
  }

  const handleRemoveFromCart = async (
    lineId: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (cartContext.removing) return;
    cartContext.removeFromCart(lineId);
  };

  const goToCheckout = () => {
    const checkoutUrl = localStorage.getItem("checkoutUrl");
    if (!checkoutUrl) return;
    window.location.href = checkoutUrl;
  };

  return (
    <div className="Cart">
      <div className="Row">
        <div className="TitleArea">
          <h1>Cart</h1>
          <h6>Wonderful additions to your collection await!</h6>
        </div>
        <div className="Overview">
          <h3>{`Subtotal: ${formatMoney(cart.cost.subtotalAmount)}`}</h3>
          <div className="CheckoutButton" onClick={() => goToCheckout()}>
            Checkout
            <MdOutlineOpenInNew />
          </div>
        </div>
      </div>
      <div className="Wrapper">
        {cart?.lines?.nodes.map((node) => {
          const lineId = node.id;
          return (
            <div
              key={node.merchandise.id}
              className="CartItem"
              onClick={() =>
                navigate(`/cart/${node.merchandise.product?.handle}`)
              }
            >
              <div className="Left">
                <img
                  src={
                    node.merchandise.product?.featuredImage?.url ||
                    defaultImage(node.merchandise.product?.productType || "")
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
                  onClick={(e) => handleRemoveFromCart(lineId, e)}
                  className={
                    lineId === cartContext.removing ? "RemoveLoading" : ""
                  }
                >
                  {lineId === cartContext.removing ? (
                    <BeatLoader size={8} color={"#ffffff"} loading={true} />
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
