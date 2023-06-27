import React, { useContext } from "react";
import "./ProductsGrid.css";
import {
  defaultImage,
  formatMoney,
  formatPackage,
  parseVolumes,
  truncate,
} from "../../../functions/utilities";
import { useNavigate } from "react-router-dom";
import {
  MdAddCircleOutline,
  MdAddShoppingCart,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import LoadingDisplay from "../../atoms/LoadingDisplay/LoadingDisplay";
import { CartContext } from "../../../functions/contextProviders";
import { usePagination } from "react-instantsearch-hooks-web";
import GridLoading from "../../molecules/GridLoading/GridLoading";

interface ProductsGridProps {
  hits: Hit[];
  loading?: boolean;
}

const ProductsGrid = ({ hits, loading }: ProductsGridProps) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, amountInCart } = useContext(CartContext);
  const { isFirstPage, isLastPage, currentRefinement, refine } =
    usePagination();

  const selectProduct = (handle: string) => {
    navigate(`/cellar/${handle}`);
  };

  const handleAdd = async (e: React.MouseEvent<any>, id: string) => {
    e.stopPropagation();
    addToCart(id);
  };

  const handleRemove = async (e: React.MouseEvent<any>, id: string) => {
    e.stopPropagation();
    removeFromCart(id);
  };

  const loadNextProducts = async () => {
    if (isLastPage) return;
    refine(currentRefinement + 1);
  };

  const loadPreviousProducts = async () => {
    if (isFirstPage) return;
    refine(currentRefinement - 1);
  };

  if (loading) {
    return (
      <div className="ProductsGridWrapper">
        <GridLoading />
      </div>
    );
  }
  return (
    <div className="ProductsGridWrapper">
      <div className="ProductsGrid">
        {hits.map((hit) => {
          const qty = amountInCart(hit.id);
          return (
            <div
              key={hit.id}
              className="ProductCard"
              onClick={() => selectProduct(hit.handle)}
            >
              <div className="CardTop">
                <img src={hit.img || defaultImage(hit.type)} alt={hit.title} />
                <div className="CardTitle">
                  <h4>{truncate(hit.title, 1000)}</h4>
                </div>
              </div>
              <div className="Categories">
                <p>{hit.region}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    color: "var(--brand-lm-10-mid)",
                  }}
                >
                  <p
                    style={{ fontWeight: 700, color: "var(--brand-lm-10-mid)" }}
                  >
                    {hit.year}
                  </p>
                  <p style={{ color: "var(--brand-lm-10-mid)" }}>
                    {hit.grapes}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <p>
                    {hit.volume
                      ? parseVolumes(hit.volume)
                      : formatPackage(hit.package)}
                  </p>
                  <span className="Price">
                    {formatMoney(
                      { amount: hit.price, currencyCode: "USD" },
                      true
                    )}
                  </span>
                </div>
              </div>
              {qty <= 0 ? (
                <div
                  className="AddToCart"
                  onClick={(e) => handleAdd(e, hit.id)}
                >
                  Add to Cart
                  <MdAddShoppingCart />
                </div>
              ) : (
                <div className="CartCounter">
                  {qty === 1 ? (
                    <TiDeleteOutline
                      className="CartInteract"
                      onClick={(e) => handleRemove(e, hit.id)}
                    />
                  ) : (
                    <MdRemoveCircleOutline
                      className="CartInteract"
                      onClick={(e) => handleRemove(e, hit.id)}
                    />
                  )}
                  <div className="AmtInCart">{qty}</div>

                  <MdAddCircleOutline
                    className="CartInteract"
                    color={qty >= hit.qty ? "#aaa" : ""}
                    onClick={(e) =>
                      qty >= hit.qty ? undefined : handleAdd(e, hit.id)
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="Pagination">
        <div
          className={!isFirstPage ? "PageButton" : "PageButton Invisible"}
          onClick={loadPreviousProducts}
        >
          Back
        </div>
        <div
          className={!isLastPage ? "PageButton" : "PageButton Invisible"}
          onClick={loadNextProducts}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
