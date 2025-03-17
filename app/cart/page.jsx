"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "../hooks/cartStore";
import { getOrderDate, getRandonNumberOrder } from "../utils/utils";

export default function Cart() {
  const router = useRouter();
  const { items: cartItems, removeItem, clearCart } = useCartStore();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    const orderNumber = getRandonNumberOrder()
    const orderDate =  getOrderDate()

    const orderDetails = {
      orderNumber,
      items: cartItems,
      total: totalPrice,
      date: orderDate,
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderDetails));
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      setIsProcessing(true);
      router.push("/cart/success");
    }, 2000);
  };

  return (
    <>
      <div className="container">
        <div className="cart-header">
          <p className="cart-header__title">
            CARRITO{" "}
            <span className="cart-header__count">({cartItems.length})</span>
          </p>
        </div>
        <div className="cart">
          {cartItems.length === 0 ? (
            <></>
          ) : (
            <>
              <div className="cart__items">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="cart-item">
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
                      <div className="cart-item__wrap-details">
                        <div className="cart-item__name" data-testid={`cart-item-name-${item.cartId}`}>{item.name}</div>
                        <div className="cart-item__details" data-testid={`cart-item-details-${item.cartId}`}>
                          {item.storage} / {item.color}
                        </div>

                        <div className="cart-item__price">
                          {(item.price * item.quantity).toFixed(2)} EUR
                        </div>
                      </div>
                      <div>
                        <button
                          className="cart-item__remove"
                          onClick={() => removeItem(item.cartId)}
                          data-testid={`remove-item-${item.cartId}`}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart__footer">
                <button
                  className="cart__continue"
                  onClick={() => router.push("/")}
                  data-testid="continue-shopping"
                >
                  CONTINUAR COMPRANDO
                </button>
                <div className="cart__total">
                  TOTAL: <span>{totalPrice} EUR</span>
                </div>
                <button
                  className="cart__pay"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  data-testid="pay-button"
                >
                  {isProcessing ? "PROCESANDO..." : "PAGAR"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
