import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { MdSearch, MdClear } from "react-icons/md";
import "./SearchBar.css";
import { useDebounce } from "../../../hooks";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearch !== null) onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch, searchQuery]);

  const handleClear = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleSearchAreaClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        inputRef.current.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`search-bar ${isInputFocused ? "focused" : ""}`}
      onClick={handleSearchAreaClick}
    >
      {searchQuery ? (
        <MdClear className="search-icon" onClick={handleClear} />
      ) : (
        <MdSearch className="search-icon" />
      )}
      <input
        className="search-input"
        type="text"
        placeholder="Search locations, notes, dates..."
        value={searchQuery || ""}
        onChange={handleChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
      />
    </div>
  );
};

export default SearchBar;
