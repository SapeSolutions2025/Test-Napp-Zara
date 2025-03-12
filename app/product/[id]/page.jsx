"use client";

import "../../styles/components/_product-detail.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import SimilarProducts from "../../components/SimilarProducts";
import { getProductById } from "../../services/product-services";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState(
    product?.colorsOptions?.[0] || null
  );
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem} = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productData = await getProductById(id);
        console.log(productData);

        setProduct(productData);
        setSimilarProducts(productData.similarProducts);
        setSelectedColor(null);
        setSelectedStorage(null);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
      });

      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    }
  };

  const isAddToCartDisabled =
    selectedColor === null || selectedStorage === null;

  if (isLoading) {
    return (
      <main>
        <div className="sticky-header">
          <Navbar />
        </div>
        <div className="container">
          <div className="product-detail">
            <p>Loading product details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main>
        <div className="sticky-header">
          <Navbar />
        </div>
        <div className="container">
          <div className="product-detail">
            <p>Product not found</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="sticky-header">
        <Navbar />
      </div>
      <div className="container">
        <button
          onClick={() => router.back()}
          className="back-button"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
          BACK
        </button>

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
                className="product-detail__image"
                priority
              />
            </div>
            <div className="product-detail__info">
              <div className="product-detail__brand">{product.brand}</div>
              <h1 className="product-detail__name">{product.name}</h1>
              <div className="product-detail__price">
                From {selectedStorage ? selectedStorage.price : product.price}{" "}
                EUR
              </div>

              <div className="product-detail__storage">
                <div className="product-detail__section-title">STORAGE</div>
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
                <div className="product-detail__section-title">COLOR</div>
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
              </div>

              <button
                className={`product-detail__button ${
                  addedToCart ? "product-detail__button--added" : ""
                } ${
                  isAddToCartDisabled ? "product-detail__button--disabled" : ""
                }`}
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
              >
                {addedToCart ? "ADDED TO CART ✓" : "ADD TO CART"}
              </button>
            </div>
          </div>

          <div className="product-detail__specifications">
            <h2 className="product-detail__section-title">SPECIFICATIONS</h2>
            <div className="specifications-table">
              <div className="specifications-row">
                <div className="specifications-label">Brand</div>
                <div className="specifications-value">
                  {product.specs?.brand || product.brand}
                </div>
              </div>
              <div className="specifications-row">
                <div className="specifications-label">Battery</div>
                <div className="specifications-value">
                  {product.specs?.battery}
                </div>
              </div>
              <div className="specifications-row">
                <div className="specifications-label">OS</div>
                <div className="specifications-value">{product.specs?.os}</div>
              </div>
              <div className="specifications-row">
                <div className="specifications-label">Processor</div>
                <div className="specifications-value">
                  {product.specs?.battery}
                </div>
              </div>
              <div className="specifications-row">
                <div className="specifications-label">Resolution</div>
                <div className="specifications-value">
                  {product.specs?.resolution}
                </div>
              </div>
              <div className="specifications-row">
                <div className="specifications-label">Screen</div>
                <div className="specifications-value">
                  {product.specs?.screen}
                </div>
              </div>
              <div className="specifications-row">
                <div className="specifications-label">Screen Fresh</div>
                <div className="specifications-value">
                  {product.specs?.screenRefreshRate}
                </div>
              </div>
              <div className="specifications-row">
                <div className="specifications-label">Selfie camera</div>
                <div className="specifications-value">
                  {product.specs?.selfieCamera}
                </div>
              </div>
            </div>
          </div>

          {similarProducts?.length > 0 && (
            <SimilarProducts
              products={similarProducts}
              title="Similar Products"
            />
          )}
        </div>
      </div>
    </main>
  );
}
