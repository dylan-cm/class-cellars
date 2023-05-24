import React, { useEffect, useRef, useState } from "react";
import "./GridOptions.css";
import { getProductTypes } from "../../../functions/actions";
import { ProductSortKeys } from "../../../global.d";
import { BeatLoader } from "react-spinners";

interface GridOptionsProps {
  filterProducts: (props: {
    productType?: string;
    sortKey?: ProductSortKeys;
    reverse?: boolean;
  }) => void;
}

const GridOptions = ({ filterProducts, ...props }: GridOptionsProps) => {
  const [sort, setSort] = useState<string>();
  const [chips, setChips] = useState<(string | undefined)[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<
    string | undefined
  >();
  const [loadingChips, setLoadingChips] = useState(true);

  /* #region scrolling */
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
  /* #endregion */

  useEffect(() => {
    const initFetch = async () => {
      setLoadingChips(true);
      const productTypes = await getProductTypes();
      setChips([undefined, ...productTypes]);
      setLoadingChips(false);
    };
    initFetch();
  }, []);

  const handleSort = (sortString: string) => {
    if (sortString === sort) return;
    const parsed = parseSortString(sortString);
    filterProducts({
      productType: selectedProductType,
      sortKey: parsed?.sortKey,
      reverse: parsed?.reverse,
    });
    setSort(sortString);
  };

  const handleChip = (chipLabel?: string) => {
    if (selectedProductType === chipLabel) return;
    filterProducts({
      productType: chipLabel,
      sortKey: parseSortString(sort)?.sortKey,
      reverse: parseSortString(sort)?.reverse,
    });
    setSelectedProductType(chipLabel);
  };

  function parseSortString(sortString?: string):
    | {
        sortKey: ProductSortKeys;
        reverse: boolean;
      }
    | undefined {
    if (!sortString) return;
    const parts = sortString.split("/");
    const sortKey = parts[0] as ProductSortKeys;
    const reverse = parts.length > 1 && parts[1] === "reverse";

    if (Object.values(ProductSortKeys).includes(sortKey)) {
      return {
        sortKey,
        reverse,
      };
    } else {
      return;
    }
  }

  return (
    <div className="GridOptions">
      <div
        className={"ChipRow" + handleShadow()}
        onWheel={handleScroll}
        ref={ref}
      >
        {!loadingChips ? (
          chips.map((chipLabel, i) => (
            <div
              key={"filter:" + chipLabel + i}
              className={
                selectedProductType === chipLabel ? "Chip ActiveChip" : "Chip"
              }
              onClick={() => {
                handleChip(chipLabel);
              }}
            >
              {i === 0 ? "View All" : chipLabel}
            </div>
          ))
        ) : (
          <BeatLoader size={8} color={"#cb002d"} />
        )}
      </div>
      <div className="Sort">
        <span>{"Sort:"}</span>
        <select value={sort} onChange={(e) => handleSort(e.target.value)}>
          <option value={undefined}>Default</option>
          <option value={ProductSortKeys.CREATED_AT}>Newest Arrivals</option>
          <option value={ProductSortKeys.PRICE + "/reverse"}>
            Price High to Low
          </option>
          <option value={ProductSortKeys.PRICE}>Price Low to High</option>
          <option value={ProductSortKeys.TITLE}>A to Z</option>
          <option value={ProductSortKeys.TITLE + "/reverse"}>Z to A</option>
        </select>
      </div>
    </div>
  );
};

export default GridOptions;
