import React, { useEffect, useState } from "react";
import "./Cellar.css";
import ProductsGrid from "../../organisms/ProductsGrid/ProductsGrid";
import GridOptions from "../../molecules/GridOptions/GridOptions";
import { useInstantSearch } from "react-instantsearch-hooks-web";

interface ProductsPageProps {}

const ProductsPage = ({ ...props }: ProductsPageProps) => {
  //Algolia
  const { results } = useInstantSearch();
  const [hits, setHits] = useState<any[]>([]);

  useEffect(() => {
    setHits(results.hits);
  }, [results]);

  return (
    <div className="ProductsPage">
      <div className="ProductsPageWrapper">
        <div className="TitleArea">
          <h1>Our Cellar</h1>
          <h6>For your eyes only.</h6>
          <div className="Line" />
        </div>
        <GridOptions />
        <ProductsGrid
          hits={hits.map<Hit>((hit) => ({
            title: hit.title,
            price: hit.price,
            qty: hit.inventory_quantity,
            updated: new Date(hit.updated_at),
            id: hit.objectID,
            type: hit.product_type,
            region: hit.meta?.custom?.region || "",
            volume: hit.meta?.custom?.volume || 0,
            package: hit.meta?.custom?.package || 1,
            year: hit.meta?.custom?.year || 2023,
            grapes: hit.meta?.custom?.grapes || "",
            handle: hit.handle,
            img: hit.product_image,
          }))}
          loading={!hits}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
