import React, { useEffect, useState } from "react";
import "./ProductDetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../../functions/actions";
import { formatMoney } from "../../../functions/utilities";

interface ProductDetailPageProps {}

const PLACEHOLDER_THUMBNAIL =
  "https://placeholder.pics/svg/400x480/A6323B-4F0B41/FFFFFF-000000";

const ProductDetailPage = ({ ...props }: ProductDetailPageProps) => {
  const [product, setProduct] = useState<Product | undefined>();
  const { productHandle } = useParams<{ productHandle: string }>();

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    const initFetch = async () => {
      const fetched = await getProduct(productHandle, true);
      setProduct(fetched);
    };
    initFetch();
  }, [productHandle]);

  if (!product || !product.variants) return <h1>...Loading</h1>; //todo: handle error state 'looks like we couldn't find that wine. go back to our cellar'

  const variant = product.variants.nodes[0];
  return (
    <div className="ProductDetailPage">
      <div className="BackButton" onClick={goBack}>
        Back
      </div>
      <div className="Wrapper">
        <img
          src={product.featuredImage?.url || PLACEHOLDER_THUMBNAIL}
          alt={product.featuredImage?.altText || product.handle}
        />
        <div className="Details">
          <h1>{product.title}</h1>
          <p>
            {formatMoney({
              amount: variant.price.amount,
              currencyCode: variant.price.currencyCode,
            })}
          </p>
          <p>{product.productType}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
