import React, { useContext } from "react";
import "./ProductsGrid.css";
import {
  defaultImage,
  formatMoney,
  parseVolumes,
  truncate,
} from "../../../functions/utilities";
import { useNavigate } from "react-router-dom";
import { MdAddShoppingCart, MdCheck } from "react-icons/md";
import LoadingDisplay from "../../atoms/LoadingDisplay";
import { CartContext } from "../../../functions/contextProviders";
import { BeatLoader } from "react-spinners";

interface ProductsGridProps {
  products: Product[];
  next?: () => {};
  back?: () => {};
  loading?: boolean;
}

const ProductsGrid = ({ products, next, back, loading }: ProductsGridProps) => {
  const navigate = useNavigate();
  const { addToCart, adding, isInCart, removeFromCart, removing } =
    useContext(CartContext);

  const selectProduct = (handle: string) => {
    navigate(`/cellar/${handle}`);
  };

  const handleAdd = async (e: React.MouseEvent<any>, variantId: string) => {
    e.stopPropagation();
    const line = isInCart(variantId);
    if (line) {
      removeFromCart(line);
      return;
    }
    addToCart(variantId);
  };

  if (loading) {
    return (
      <div className="ProductsGridWrapper">
        <LoadingDisplay />
      </div>
    );
  }
  return (
    <div className="ProductsGridWrapper">
      <div className="ProductsGrid">
        {products.map((product) => {
          const variant = product.variants?.nodes[0];
          if (!variant) return undefined;
          return (
            <div
              key={product.id}
              className="ProductCard"
              onClick={() => selectProduct(product.handle)}
            >
              <div className="CardTop">
                <img
                  src={
                    product.featuredImage?.url ||
                    defaultImage(product.productType)
                  }
                  alt={product.featuredImage?.altText || product.title}
                />
                <div className="CardTitle">
                  <h4>{truncate(product.title, 1000)}</h4>
                </div>
              </div>
              <div className="Categories">
                <p>{product.productType}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <p>{parseVolumes(product.description)}</p>
                  <span className="Price">
                    {formatMoney(variant.price, true)}
                  </span>
                </div>
              </div>
              <div
                className="CartAdd"
                onClick={(e) => handleAdd(e, variant.id)}
              >
                {adding === variant.id ||
                (removing && removing === isInCart(variant.id)) ? (
                  <BeatLoader color="white" size={6} />
                ) : isInCart(variant.id) ? (
                  <MdCheck />
                ) : (
                  <MdAddShoppingCart />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="Pagination">
        <div
          className={back ? "PageButton" : "PageButton Invisible"}
          onClick={back}
        >
          Back
        </div>
        <div
          className={next ? "PageButton" : "PageButton Invisible"}
          onClick={next}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
