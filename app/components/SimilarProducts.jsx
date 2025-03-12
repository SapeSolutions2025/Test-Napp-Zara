"use client"

import "../styles/components/_similar-products.scss"
import { useRef, useEffect, useState } from "react"
import ProductCard from "./ProductCard"


export default function SimilarProducts({ products, title }) {
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100
      setScrollProgress(scrollPercentage)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="similar-products">
      <h2 className="similar-products__title">{title}</h2>
      <div className="similar-products__container" ref={containerRef}>
        <div className="similar-products__content">
          {products.map((product) => (
            <ProductCard
            key={product.id}
            id={product.id}
            brand={product.brand}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
          ))}
        </div>
      </div>
      <div className="similar-products__progress">
        <div className="similar-products__progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
    </div>
  )
}

