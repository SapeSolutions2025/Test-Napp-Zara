"use client";
import Image from "next/image";
import Link from "next/link";
import "../styles/components/_product-card.scss";


export default function ProductCard({ id, brand, name, price, imageUrl }) {
  return (
    <Link href={`/product/${id}`}>
      <div className="product-card">
        <div className="product-card__image-container">
          <Image
            src={imageUrl}
            alt={'imagen'}
            fill
            sizes="100vw"
            className="product-card__image"
            priority
          />
        </div>
        <div className="product-card__content">
          <div className="product-card__brand">{brand}</div>
          <div className="product-card__info">
            <span className="product-card__name">{name}</span>
            <span className="product-card__price">{price} EUR</span>
          </div>
        </div>
        <div className="product-card__overlay"></div>
      </div>
    </Link>
  );
}
