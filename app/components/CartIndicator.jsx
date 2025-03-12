"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import "../styles/components/_cart-indicator.scss"
import { useCart } from "../context/CartContext"

export default function CartIndicator() {
  const { getTotalItems } = useCart()
  const [isPulsing, setIsPulsing] = useState(false)
  const [prevCount, setPrevCount] = useState(0)
  const itemCount = getTotalItems()

  // Add pulse animation when cart count changes
  useEffect(() => {
    if (itemCount > prevCount) {
      setIsPulsing(true)
      const timer = setTimeout(() => {
        setIsPulsing(false)
      }, 500)

      return () => clearTimeout(timer)
    }

    setPrevCount(itemCount)
  }, [itemCount, prevCount])

  return (
    <Link href="/cart" className="navbar__icon cart-indicator">
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className={`cart-indicator__count ${isPulsing ? "cart-indicator__count--pulse" : ""}`}>
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  )
}

