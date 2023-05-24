import React, { useContext, useEffect, useState } from "react";
import "./ProductDetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../../functions/actions";
import { defaultImage, formatMoney } from "../../../functions/utilities";
import { MdAddShoppingCart, MdArrowBack } from "react-icons/md";
import { CartContext } from "../../../functions/contextProviders";
import LoadingDisplay from "../../atoms/LoadingDisplay";
import ErrorDisplay from "../../molecules/ErrorDisplay/ErrorDisplay";

interface ProductDetailPageProps {
  back: string;
}

const ProductDetailPage = ({ ...props }: ProductDetailPageProps) => {
  const { productHandle } = useParams<{
    productHandle: string;
  }>();
  const { addToCart } = useContext(CartContext);
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
          <p>{product.productType}</p>
          <p>{product.description}</p>
          <div className="DetailsBottom">
            <div className="PriceOfProduct">
              {formatMoney({
                amount: variant.price.amount,
                currencyCode: variant.price.currencyCode,
              })}
            </div>
            <div
              className="DetailsCartAddButton"
              onClick={() => handleAdd(variant.id)}
            >
              <MdAddShoppingCart color="white" size={24} /> Add to Cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
