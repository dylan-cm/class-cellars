import React, { useEffect, useState } from "react";
import "./ProductsPage.css";
import { addToCart, fetchProducts } from "../../../functions/actions";
import { truncate } from "../../../functions/utilities";

interface ProductsPageProps {}

const ProductsPage = ({ ...props }: ProductsPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<number>(0);
  const [chips, setChips] = useState<string[]>([]);
  const [selectedChip, setSelectedChip] = useState<number>(0);
  const [startCursor, setStartCursor] = useState<string | undefined>();
  const [endCursor, setEndCursor] = useState<string | undefined>();
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const newFetch = async (back?: boolean, cursor?: string) => {
    const {
      fetchedProducts,
      newStartCursor,
      newEndCursor,
      newHasNextPage,
      newHasPreviousPage,
    } = await fetchProducts({
      amount: 20,
      descriptionTruncate: 0,
      back,
      cursor,
    });
    setProducts(fetchedProducts);
    setStartCursor(newStartCursor);
    setEndCursor(newEndCursor);
    setHasNextPage(newHasNextPage);
    setHasPrevPage(newHasPreviousPage);
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

  // debugging purposes
  // useEffect(() => {
  //   console.log("new load", {
  //     products: products.length,
  //     startCursor,
  //     endCursor,
  //   });
  // }, [startCursor, endCursor, products]);

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

  const selectProduct = (id: string) => {
    //todo: navigate to product page
    console.log("select product", id);
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
            return (
              <div
                key={product.id}
                className="ProductCard"
                onClick={(e) => selectProduct(product.id)}
              >
                <div className="CardTop">
                  <img src={product.img} alt={product.title} />
                  <div className="CardTitle">
                    <h4>{truncate(product.title, 1000)}</h4>
                    <span>{`${Number(product.price).toLocaleString("en-US", {
                      style: "currency",
                      maximumFractionDigits: 0,
                      currency: "USD",
                    })}`}</span>
                  </div>
                </div>
                <p className="Categories">{product.type}</p>
                <div
                  className="CartAdd"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.id);
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