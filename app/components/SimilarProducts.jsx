"use client"

import { useRef, useEffect, useState } from "react"
import ProductCard from "./ProductCard"

export default function SimilarProducts({ products, title, initialProgress = 4}) {
  const containerRef = useRef(null)
  const progressBarRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(initialProgress)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100
      setScrollProgress(scrollPercentage)
    }
  }

  const handleProgressBarClick = (e) => {
    if (!isLargeScreen || !containerRef.current || !progressBarRef.current) return

    const progressBar = progressBarRef.current
    const rect = progressBar.getBoundingClientRect()
    const clickPosition = e.clientX - rect.left
    const percentage = clickPosition / rect.width

    const container = containerRef.current
    const scrollableWidth = container.scrollWidth - container.clientWidth
    const newScrollPosition = percentage * scrollableWidth

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      // Add scroll event listener
      container.addEventListener("scroll", handleScroll)

      // Set initial scroll position based on initialProgress
      const scrollableWidth = container.scrollWidth - container.clientWidth
      const initialScrollPosition = (initialProgress / 100) * scrollableWidth
      container.scrollLeft = initialScrollPosition

      const checkScreenSize = () => {
        setIsLargeScreen(window.innerWidth >= 768) // Adjust breakpoint as needed
      }

      checkScreenSize()
      window.addEventListener("resize", checkScreenSize)

      return () => {
        container.removeEventListener("scroll", handleScroll)
        window.removeEventListener("resize", checkScreenSize)
      }
    }
  }, [initialProgress])

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
            hasBorder={true}
          />
          ))}
        </div>
      </div>
      <div
        className={`similar-products__progress ${isLargeScreen ? "similar-products__progress--interactive" : ""}`}
        onClick={handleProgressBarClick}
        ref={progressBarRef}
      >
        <div className="similar-products__progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
    </div>
  )
}

