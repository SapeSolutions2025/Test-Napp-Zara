import { Search, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function NoProductsFound({ searchTerm }) {
  return (
    <div className="no-products">
      <div className="no-products__icon">
        <Search size={48} strokeWidth={1} />
      </div>
      <h2 className="no-products__title">No products found</h2>
      <p className="no-products__message">
        {searchTerm
          ? `We couldn't find any products matching "${searchTerm}". Try a different search term or browse our collection.`
          : "No products are currently available. Please check back later."}
      </p>
      <div className="no-products__actions">
        <Link href="/">
          <button className="no-products__button">
            <RefreshCw size={14} className="mr-2" />
            View All Products
          </button>
        </Link>
      </div>
    </div>
  )
}