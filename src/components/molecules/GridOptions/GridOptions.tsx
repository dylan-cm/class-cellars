import React, { useEffect, useRef, useState } from "react";
import "./GridOptions.css";
import {
  SearchBox,
  SortBy,
  useRefinementList,
} from "react-instantsearch-hooks-web";
import { MdSearch } from "react-icons/md";

interface GridOptionsProps {}

const GridOptions = ({ ...props }: GridOptionsProps) => {
  return (
    <div className="GridOptions">
      <SearchBox
        placeholder="Search wines, regions, grapes, vintages..."
        classNames={{
          input: "SearchBoxInput",
          submit: "SearchButton",
          reset: "SearchButton",
          root: "SearchBox",
          form: "SearchBoxForm",
        }}
        submitIconComponent={() => <MdSearch color="#aaa" size={20} />}
      />
      <ChipRow attribute={"product_type"} label="Types" />
      <ChipRow attribute={"meta.custom.grapes"} label="Grapes" />
      <ChipRow attribute={"meta.custom.region"} label="Regions" />
      <SortBy
        className="Sort"
        items={[
          {
            label: "Featured",
            value: "shopify_products",
          },
          {
            label: "Vintage (Oldest First)",
            value: "shopify_products_vintage_asc",
          },
          {
            label: "Vintage (Youngest First)",
            value: "shopify_products_vintage_desc",
          },
          {
            label: "Price (Low to High)",
            value: "shopify_products_price_asc",
          },
          {
            label: "Price (High to Low)",
            value: "shopify_products_price_desc",
          },
        ]}
      />
    </div>
  );
};

export default GridOptions;

interface ChipRowProps {
  attribute: string;
  label: string;
}

const ChipRow = ({ attribute, label }: ChipRowProps) => {
  const filter = useRefinementList({ attribute: attribute });
  const ref = useRef<HTMLDivElement | null>(null);
  const [shadow, setShadow] = useState({ left: false, right: true });
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (ref.current) {
      ref.current.scrollLeft -= event.deltaY;
      ref.current.scrollLeft += event.deltaX;
    }
    updateShadow();
  };
  const updateShadow = () => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setShadow({
        left: scrollLeft > 0,
        right: Math.ceil(scrollLeft) < scrollWidth - clientWidth,
      });
    }
  };
  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("wheel", handleScroll as any, {
        passive: false,
      });
      element.addEventListener("scroll", updateShadow);
      updateShadow();
    }
    return () => {
      if (element) {
        element.removeEventListener("wheel", handleScroll as any);
        element.removeEventListener("scroll", updateShadow);
      }
    };
  }, []);

  const handleShadow = () => {
    var shadowClass = "";
    if (shadow.left) shadowClass += " LeftShadow ";
    if (shadow.right) shadowClass += " RightShadow ";
    return shadowClass;
  };

  return (
    <div
      className={"ChipRow" + handleShadow()}
      onWheel={handleScroll}
      ref={ref}
    >
      <div
        className={
          !filter.items.find((item) => item.isRefined === true)
            ? "Chip ActiveChip"
            : "Chip"
        }
        onClick={() => {
          filter.items.forEach((item) => {
            if (item.isRefined) filter.refine(item.value);
          });
        }}
      >
        All {label}
      </div>
      {filter.items
        .sort((a, b) => {
          if (a.isRefined === b.isRefined) return 0;
          return a.isRefined ? -1 : 1; // if a's attribute is true, move it ahead
        })
        .map((item) => (
          <div
            key={"filter:" + item.value + label}
            className={item.isRefined ? "Chip ActiveChip" : "Chip"}
            onClick={() => filter.refine(item.value)}
          >
            {item.label} <div className="FilterCount">{item.count}</div>
          </div>
        ))}
    </div>
  );
};
