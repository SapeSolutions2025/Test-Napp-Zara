"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCartStore } from "../hooks/cartStore";
import SimilarProducts from "./SimilarProducts";
import ProductSpecs from "./ProductSpecs";

export default function ProductDetail({ product }) {
  const router = useRouter();
  const [similarProducts] = useState(product.similarProducts || []);
  const [selectedColor, setSelectedColor] = useState(
    product?.colorsOptions?.[0] || null,
  );
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (product && selectedColor !== null && selectedStorage) {
      addItem({
        id: product.id,
        brand: product.brand,
        name: product.name,
        price: selectedStorage.price,
        color: product.colorOptions[selectedColor].name,
        colorValue: product.colorOptions[selectedColor].hexCode,
        image: product.colorOptions[selectedColor].imageUrl,
        storage: selectedStorage.capacity,
      });

      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 1500);
    }
  };

  const isAddToCartDisabled =
    selectedColor === null || selectedStorage === null;

  return (
    <>
      <div className="product-detail-content">
        <div className="back-button">
          <button
            onClick={() => router.back()}
            className="back-button__button"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
            VOLVER
          </button>
        </div>

        <div className="product-detail">
          <div className="product-detail__container">
            <div className="product-detail__images">
                <Image
                  src={
                    product?.colorOptions[selectedColor]?.imageUrl ||
                    product?.colorOptions[0]?.imageUrl
                  }
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw"
                  className="product-detail__image"
                  priority
                />
            </div>
            <div className="product-detail__info">
              <h1 className="product-detail__name" data-testid={`product-name-${product.id}`}>{product.name}</h1>
              <div className="product-detail__price" data-testid={`product-price-${product.id}`}>
                {selectedStorage ? selectedStorage.price : product.basePrice}{" "}
                EUR
              </div>

              <div className="product-detail__storage">
                <div className="product-detail__section-title">
                  ALMACENAMIENTO ¿CUANTO ESPACIO NECESITAS?
                </div>
                <div className="product-detail__storage-options">
                  {product.storageOptions.map((option) => (
                    <button
                      key={option.capacity}
                      className={`storage-option ${
                        selectedStorage?.capacity === option.capacity
                          ? "storage-option--active"
                          : ""
                      }`}
                      onClick={() => setSelectedStorage(option)}
                    >
                      {option.capacity}
                    </button>
                  ))}
                </div>
              </div>

              <div className="product-detail__colors">
                <div className="product-detail__section-title">
                  COLOR, ELIJE TU FAVORITO
                </div>
                <div className="product-detail__colors-options">
                  {product.colorOptions.map((color, index) => (
                    <button
                      key={color.name}
                      className={`color-option ${
                        index === selectedColor ? "color-option--active" : ""
                      }`}
                      style={{ backgroundColor: color.hexCode }}
                      onClick={() => setSelectedColor(index)}
                      data-testid={`button-color-${color.name.replace(/\s/g, "")}`}
                    ></button>
                  ))}
                </div>
                <div className="product-detail__colors-name">
                  {product.colorOptions[selectedColor]?.name}
                </div>
              </div>

              <div className="product-detail__button-container">
                <button
                  className={`product-detail__button ${
                    addedToCart ? "product-detail__button--added" : ""
                  }  ${
                    isAddToCartDisabled
                      ? "product-detail__button--disabled"
                      : ""
                  }`}
                  onClick={handleAddToCart}
                  disabled={isAddToCartDisabled}
                >
                  {addedToCart ? "AÑADIDO ✓" : "AÑADIR"}
                </button>
              </div>
            </div>
          </div>
          <ProductSpecs product={product} />
        </div>
      </div>
      {similarProducts?.length > 0 && (
        <SimilarProducts products={similarProducts} title="PRODUCTOS SIMILARES" />
      )}
    </>
  );
}
