"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import "../styles/components/_cart.scss";
import { useCart } from "../context/CartContext";
import { ArrowLeft } from "lucide-react";

export default function Cart() {
  const router = useRouter();
  const { items: cartItems, removeItem, clearCart, getTotalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      alert(
        "Thank you for your purchase! This is a demo, so no actual purchase was made."
      );
    }, 2000);
  };

  return (
    <main>
      <div className="sticky-header">
        <Navbar />
      </div>
      <div className="container">
        <div className="cart">
          <div className="cart__header">
            <h1 className="cart__title">
              CART <span className="cart__count">({cartItems.length})</span>
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <></>
          ) : (
            <>
              <div className="cart__items">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="cart-item">
                    <div className="cart-item__image">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        fill
                        sizes="200vw"
                        className="cart-item__img"
                        priority
                      />
                    </div>
                    <div className="cart-item__content">
                      <h3 className="cart-item__name">{item.name}</h3>
                      <div className="cart-item__details">
                        {item.color} ·{" "}
                        {item.quantity > 1 ? `${item.quantity}x ` : ""}
                        {item.price.toFixed(2)} EUR
                      </div>
                      <div className="cart-item__price">
                        {(item.price * item.quantity).toFixed(2)} EUR
                      </div>
                      <button
                        className="cart-item__remove"
                        onClick={() => removeItem(item.id, item.color)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart__footer">
                <button
                  className="cart__continue"
                  onClick={() => router.push("/")}
                >
                  CONTINUE SHOPPING
                </button>
                <div className="cart__total">
                  TOTAL: <span>{getTotalPrice().toFixed(2)} EUR</span>
                </div>
                <button
                  className="cart__pay"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? "PROCESSING..." : "PAY"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
