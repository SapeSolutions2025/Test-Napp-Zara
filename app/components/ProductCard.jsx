"use client"

import Image from "next/image";
import Link from "next/link";


export default function ProductCard({ id, brand, name, price, imageUrl}) {
  return (
    <Link  href={`/product/${id}`}>
      <div className={`product-card`}>
        <div className="product-card__image-container">
          <Image
            src={imageUrl}
            alt={'imagen'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="product-card__image"
            priority
          />
        </div>
        <div className="product-card__content">
          <div className="product-card__brand" data-testid={`brand-name-${id}`}>{brand}</div>
          <div className="product-card__info">
            <span className="product-card__name" data-testid={`product-name-${id}`}>{name}</span>
            <span className="product-card__price" data-testid={`product-price-${id}`}>{price} EUR</span>
          </div>
        </div>
        <div className="product-card__overlay"></div>
      </div>
    </Link>
  );
}
