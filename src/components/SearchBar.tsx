"use client";

import React, { useState } from "react";
import { Search, X, Loader } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  isLoading?: boolean;
  className?: string;
  suggestions?: React.ReactNode;
  onSuggestionSelect?: (suggestion: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search for products...",
  onSearch,
  isLoading = false,
  className = "",
  suggestions,
  onSuggestionSelect,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
      e.currentTarget.blur();
    } else if (e.key === "Enter") {
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className={`relative transition-all duration-200 ${
        isFocused ? "md:shadow-lg" : ""
      }`}>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 md:py-3 border border-gray-200 focus-within:border-green-500 focus-within:bg-white transition-all duration-200">
          <Search className="w-5 h-5 text-gray-500 flex-shrink-0" aria-hidden="true" />

          <input
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500 text-sm md:text-base"
            aria-label="Search products"
            disabled={isLoading}
          />

          {isLoading && (
            <Loader className="w-4 h-4 text-green-600 animate-spin flex-shrink-0" aria-hidden="true" />
          )}

          {query && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}

          <button
            type="submit"
            className="hidden md:block ml-2 px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium text-sm"
            aria-label="Search"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Reusable Dropdown Container for Suggestions */}
        {isFocused && query && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 md:block hidden max-h-96 overflow-y-auto">
            {suggestions || (
              <div className="p-4 text-center text-gray-500 text-sm">
                Type to see suggestions
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
