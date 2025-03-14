"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch(searchParams.get("search") || "")
  }, [searchParams])

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    console.log(params)
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search"); 
    }
    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a smartphone..."
            className="search-input"
          />
          <button
            type="submit"
            className="search-button"
            aria-label="Buscar"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </form>
  );
}
