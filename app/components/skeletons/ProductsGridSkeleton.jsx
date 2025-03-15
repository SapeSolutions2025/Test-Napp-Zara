import "../../styles/components/_skeleton.scss"

const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <div className="image-skeleton"></div>
      <div className="content-skeleton">
        <div className="brand-skeleton"></div>
        <div className="name-skeleton"></div>
        <div className="price-skeleton"></div>
      </div>
    </div>
  )
}

export default function ProductsGridSkeleton() {
  const skeletonItems = Array.from({ length: 10 }, (_, i) => i)

  return (
    <div className="main-content">
      <div className="container">
        <div className="products-grid">
          {skeletonItems.map((item) => (
            <ProductCardSkeleton key={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
