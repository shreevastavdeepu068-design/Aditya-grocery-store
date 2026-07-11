"use client";

import { useEffect, useState } from "react";
import {
  searchProducts,
  getSearchSuggestions,
} from "@/lib/search";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const products = await searchProducts(query);
        const suggest = await getSearchSuggestions(query);

        setResults(products);
        setSuggestions(suggest);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    suggestions,
    loading,
  };
}
