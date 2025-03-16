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
    product?.colorsOptions?.[0] || null
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
      <div className="back-button-container">
        <button
          onClick={() => router.back()}
          className="back-button"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
          BACK
        </button>
      </div>
      <div className="container">
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
                sizes="(max-width: 768px) 260px, (max-width: 1024px) 373px, 510px"
                className="product-detail__image"
                priority
              />
            </div>
            <div className="product-detail__info">
              <h1 className="product-detail__name">{product.name}</h1>
              <div className="product-detail__price">
                {selectedStorage ? selectedStorage.price : product.basePrice}{" "}
                EUR
              </div>

              <div className="product-detail__storage">
                <div className="product-detail__section-title">
                  STORAGE ¿HOW MUCH SPACE DO YOU NEED?
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
                  COLOR, PICK YOUR FAVORITE
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
                    ></button>
                  ))}
                </div>
                <div className="product-detail__colors-name">
                  {product.colorOptions[selectedColor]?.name}
                </div>
              </div>

              <button
                className={`product-detail__button ${
                  addedToCart ? "product-detail__button--added" : ""
                }  ${
                  isAddToCartDisabled ? "product-detail__button--disabled" : ""
                }`}
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
              >
                {addedToCart ? "ADDED TO CART ✓" : "ADD TO CART"}
              </button>
            </div>
          </div>
          <ProductSpecs product={product} />
          {similarProducts?.length > 0 && (
            <SimilarProducts
              products={similarProducts}
              title="SIMILAR PRODUCTS"
            />
          )}
        </div>
      </div>
    </>
  );
}
