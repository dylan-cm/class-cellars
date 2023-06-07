import React, { useContext, useEffect, useState } from "react";
import "./ProductDetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../../functions/actions";
import { defaultImage, formatMoney } from "../../../functions/utilities";
import {
  MdAddCircleOutline,
  MdAddShoppingCart,
  MdArrowBack,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { CartContext } from "../../../functions/contextProviders";
import LoadingDisplay from "../../atoms/LoadingDisplay";
import ErrorDisplay from "../../molecules/ErrorDisplay/ErrorDisplay";
import { TiDeleteOutline } from "react-icons/ti";

interface ProductDetailPageProps {
  back: string;
}

const ProductDetailPage = ({ ...props }: ProductDetailPageProps) => {
  const { productHandle } = useParams<{
    productHandle: string;
  }>();
  const { addToCart, removeFromCart, amountInCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product | undefined>();
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const initFetch = async () => {
      try {
        const fetched = await getProduct(productHandle, true);
        setProduct(fetched);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError(String(e));
      }
    };
    initFetch();
  }, [productHandle]);

  const handleAdd = async (variantId: string) => {
    addToCart(variantId);
  };

  const handleRemove = async (variantId: string) => {
    removeFromCart(variantId);
  };

  const goBack = () => {
    navigate(`/${props.back}`);
  };

  if (error) {
    return <ErrorDisplay message={error} />; // Use Error component
  }

  if (!product || !product.variants) {
    return <LoadingDisplay />; // Use Loading component
  }

  const variant = product.variants.nodes[0];
  const regexArr = variant.id.match(/\d+$/);
  const merchandiseId = regexArr ? regexArr[0] : "";
  const qty = amountInCart(merchandiseId);
  return (
    <div className="ProductDetailPage">
      <div className="InteractiveRow">
        <div className="BackButton" onClick={goBack}>
          <MdArrowBack size={24} /> {`Back to ${props.back}`}
        </div>
      </div>
      <div className="Wrapper">
        <img
          className="ProductPhoto"
          src={product.featuredImage?.url || defaultImage(product.productType)}
          alt={product.featuredImage?.altText || product.handle}
        />
        <div className="Details">
          <h1>{product.title}</h1>
          <p>{`Type: ${product.productType}`}</p>
          {product.metafields?.map((metafield, i) => {
            if (metafield)
              return (
                <p key={metafield.key + metafield.value}>
                  {metafield.key === "package"
                    ? Number(metafield.value) > 1
                      ? `Package: Crate of ${metafield.value}`
                      : `Package: ${metafield.value} Bottle`
                    : `${
                        metafield.key.charAt(0).toUpperCase() +
                        metafield.key.slice(1)
                      }: ${metafield.value}`}
                </p>
              );
            else return <div key={"empty_meta" + i}></div>;
          })}
          <p>{`Quantity Available: ${variant.quantityAvailable}`}</p>
          <p>
            {`Price: ${formatMoney({
              amount: variant.price.amount,
              currencyCode: variant.price.currencyCode,
            })}`}
          </p>
          <div className="CartModifier">
            {qty <= 0 ? (
              <div
                className="AddToCart"
                onClick={() => handleAdd(merchandiseId)}
              >
                Add to Cart
                <MdAddShoppingCart />
              </div>
            ) : (
              <div className="CartCounter">
                {qty === 1 ? (
                  <TiDeleteOutline
                    className="CartInteract"
                    onClick={() => handleRemove(merchandiseId)}
                  />
                ) : (
                  <MdRemoveCircleOutline
                    className="CartInteract"
                    onClick={() => handleRemove(merchandiseId)}
                  />
                )}
                <div className="AmtInCart">{qty}</div>
                <MdAddCircleOutline
                  className="CartInteract"
                  color={qty >= variant.quantityAvailable ? "#aaa" : ""}
                  onClick={() =>
                    qty >= variant.quantityAvailable
                      ? undefined
                      : handleAdd(merchandiseId)
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
