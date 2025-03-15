"use client";

import { useCallback, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const router = useTransitionRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateSearchParams = useCallback(
    (newSearch) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newSearch === "") {
        params.delete("search");
      } else {
        params.set("search", newSearch);
      }
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const debouncedUpdateSearchParams = useDebouncedCallback((newSearch) => {
    updateSearchParams(newSearch, 1);
  }, 300);

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    debouncedUpdateSearchParams(newSearch);
  };

  return (
    <div className="search-area">
      <form>
        <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for a smartphone..."
            className="search-input"
          />
        </div>
      </form>
    </div>
  );
}
