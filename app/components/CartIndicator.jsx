"use client";

import "../styles/components/_cart-indicator.scss";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "../hooks/cartStore";

export default function CartIndicator() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [prevCount, setPrevCount] = useState(0);

  useEffect(() => {
    if (totalItems > prevCount) {
      setIsPulsing(true);
      const timer = setTimeout(() => {
        setIsPulsing(false);
      }, 500);

      return () => clearTimeout(timer);
    }

    setPrevCount(totalItems);
  }, [totalItems, prevCount]);

  return (
    <Link href="/cart" className="navbar__icon cart-indicator">
      <ShoppingBag size={20} />
      {totalItems > 0 ? (
        <span
          className={`cart-indicator__count ${
            isPulsing ? "cart-indicator__count--pulse" : ""
          }`}
        >
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      ) : (
        <span
          className={`cart-indicator__count ${
            isPulsing ? "cart-indicator__count--pulse" : ""
          }`}
        >
          0
        </span>
      )}
    </Link>
  );
}
