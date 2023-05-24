import React, { useEffect, useState } from "react";
import "./Cellar.css";
import { fetchProducts } from "../../../functions/actions";
import ProductsGrid from "../../organisms/ProductsGrid/ProductsGrid";
import GridOptions from "../../molecules/GridOptions/GridOptions";
import { ProductSortKeys } from "../../../global.d";

interface ProductsPageProps {}

const ProductsPage = ({ ...props }: ProductsPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [startCursor, setStartCursor] = useState<string | undefined>();
  const [endCursor, setEndCursor] = useState<string | undefined>();
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const newFetch = async ({
    ...props
  }: {
    back?: boolean;
    cursor?: string;
    productType?: string;
    sortKey?: ProductSortKeys;
    reverse?: boolean;
  }) => {
    setLoadingProducts(true);
    const fetched = await fetchProducts({
      amount: 18,
      descriptionTruncate: 6,
      back: props.back,
      cursor: props.cursor,
      productType: props.productType,
      reverse: props.reverse,
      sortKey: props.sortKey,
    });
    setProducts(fetched.products);
    setStartCursor(fetched.pageInfo.startCursor);
    setEndCursor(fetched.pageInfo.endCursor);
    setHasNextPage(fetched.pageInfo.hasNextPage);
    setHasPrevPage(fetched.pageInfo.hasPreviousPage);
    setLoadingProducts(false);
  };

  useEffect(() => {
    const initFetch = async () => {
      newFetch({});
    };
    initFetch();
  }, []);

  const loadNextProducts = async () => {
    if (!hasNextPage) return;
    newFetch({ cursor: endCursor });
  };

  const loadPreviousProducts = async () => {
    if (!hasPrevPage) return;
    newFetch({ back: true, cursor: startCursor });
  };

  const filterProducts = ({
    productType,
    sortKey,
    reverse,
  }: {
    productType?: string;
    sortKey?: ProductSortKeys;
    reverse?: boolean;
  }) => {
    newFetch({ productType, sortKey, reverse });
  };

  return (
    <div className="ProductsPage">
      <div className="ProductsPageWrapper">
        <div className="TitleArea">
          <h1>Our Cellar</h1>
          <h6>For your eyes only.</h6>
          <div className="Line" />
        </div>
        <GridOptions filterProducts={filterProducts} />
        <ProductsGrid
          products={products}
          next={hasNextPage ? loadNextProducts : undefined}
          back={hasPrevPage ? loadPreviousProducts : undefined}
          loading={loadingProducts}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
