import React, { useEffect, useState } from "react";
import "./ProductsPage.css";
import { addToCart, fetchProducts } from "../../../functions/actions";
import { formatMoney, truncate } from "../../../functions/utilities";
import { useNavigate } from "react-router-dom";

interface ProductsPageProps {}

const PLACEHOLDER_THUMBNAIL =
  "https://placeholder.pics/svg/200x240/A6323B-4F0B41/FFFFFF-000000";

const ProductsPage = ({ ...props }: ProductsPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<number>(0);
  const [chips, setChips] = useState<string[]>([]);
  const [selectedChip, setSelectedChip] = useState<number>(0);
  const [startCursor, setStartCursor] = useState<string | undefined>();
  const [endCursor, setEndCursor] = useState<string | undefined>();
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const navigate = useNavigate();

  const newFetch = async (back?: boolean, cursor?: string) => {
    const fetched = await fetchProducts({
      amount: 18,
      descriptionTruncate: 6,
      back,
      cursor,
    });
    setProducts(fetched.products);
    setStartCursor(fetched.pageInfo.startCursor);
    setEndCursor(fetched.pageInfo.endCursor);
    setHasNextPage(fetched.pageInfo.hasNextPage);
    setHasPrevPage(fetched.pageInfo.hasPreviousPage);
  };

  useEffect(() => {
    const initFetch = async () => {
      newFetch();
      //todo: get categories for chip filters
      const categories = [
        "Red",
        "White",
        "Rosé",
        "Champagne",
        "Burgundy",
        "Port",
      ];
      setChips(["View All", ...categories]);
    };
    initFetch();
  }, []);

  const selectChip = (id: number) => {
    setSelectedChip(id);
    //todo: filter results
  };

  const sortOptions = [
    "Default",
    "Oldest to Youngest",
    "Youngest to Oldest",
    "Price - High to Low",
    "Price - Low to High",
  ];

  const selectSort = (id: number) => {
    setSort(id);
    //todo: sort results
  };

  const selectProduct = (handle: string) => {
    navigate(`/product/${handle}`);
  };

  const loadNextProducts = async () => {
    if (!hasNextPage) return;
    newFetch(false, endCursor);
  };

  const loadPreviousProducts = async () => {
    if (!hasPrevPage) return;
    newFetch(true, startCursor);
  };

  return (
    <div className="ProductsPage">
      <div className="ProductsPageWrapper">
        <div className="TitleArea">
          <h1>Our Cellar</h1>
          <h6>For your eyes only.</h6>
          <div className="Line" />
        </div>
        <div className="Chips">
          {chips.map((chip, i) => (
            <div
              key={i + chip + "chip"}
              className={selectedChip === i ? "Chip ActiveChip" : "Chip"}
              onClick={() => selectChip(i)}
            >
              {chip}
            </div>
          ))}
        </div>
        <div className="Sort">
          <span>{"Sort:"}</span>
          <select
            value={sort}
            onChange={(e) => selectSort(Number(e.target.value))}
          >
            {sortOptions.map((option, i) => (
              <option key={"sortOption" + i} value={i}>
                {option}
              </option>
            ))}
          </select>
        </div>
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
                    //todo: add default pictures based off of type of wine (red, white, etc)
                    src={product.featuredImage?.url || PLACEHOLDER_THUMBNAIL}
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
                    <p>{product.description}</p>
                    <span className="Price">
                      {formatMoney({
                        amount: variant.price.amount,
                        currencyCode: variant.price.currencyCode,
                      })}
                    </span>
                  </div>
                </div>
                <div
                  className="CartAdd"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(variant.id);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="Pagination">
          <div
            className={hasPrevPage ? "PageButton" : "PageButton Invisible"}
            onClick={loadPreviousProducts}
          >
            Back
          </div>
          <div
            className={hasNextPage ? "PageButton" : "PageButton Invisible"}
            onClick={loadNextProducts}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
