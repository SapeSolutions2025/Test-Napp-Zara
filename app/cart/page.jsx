"use client";

import "../styles/components/_cart.scss";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useCartStore } from "../hooks/cartStore";

export default function Cart() {
  const router = useRouter();
  const { items: cartItems, removeItem, clearCart, getTotalPrice } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulado de checkout 
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      alert(
        "Thank you for your purchase! This is a demo"
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
                        {item.storageOption?.capacity} {item.color}
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
