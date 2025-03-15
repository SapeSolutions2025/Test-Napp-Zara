
export default function ProductSpecs({product}) {
  return (
    <div className="specifications">
    <h2 className="specifications__title">SPECIFICATIONS</h2>
    <div className="specifications__table">
    <div className="specifications__row">
        <div className="specifications__label">Brand</div>
        <div className="specifications__value">
          {product.brand}
        </div>
      </div>
      <div className="specifications__row">
        <div className="specifications__label">Name</div>
        <div className="specifications__value">
          {product.name}
        </div>
      </div>
      <div className="specifications__row">
        <div className="specifications__label">Description</div>
        <div className="specifications__value">
          {product.description}
        </div>
      </div>
      <div className="specifications__row">
        <div className="specifications__label">Battery</div>
        <div className="specifications__value">
          {product.specs?.battery}
        </div>
      </div>
      <div className="specifications__row">
        <div className="specifications__label">OS</div>
        <div className="specifications__value">{product.specs?.os}</div>
      </div>
      <div className="specifications__row">
        <div className="specifications__label">Processor</div>
        <div className="specifications__value">
          {product.specs?.battery}
        </div>
      </div>
      <div className="specifications__row">
        <div className="specifications__label">Resolution</div>
        <div className="specifications__value">
          {product.specs?.resolution}
        </div>
      </div>
      <div className="specifications__row">
        <div className="specifications__label">Screen</div>
        <div className="specifications__value">
          {product.specs?.screen}
        </div>
      </div>
      <div className="specifications__row">
        <div className="specifications__label">Screen Fresh</div>
        <div className="specifications__value">
          {product.specs?.screenRefreshRate}
        </div>
      </div>
      <div className="specifications__row">
        <div className="specifications__label">Selfie camera</div>
        <div className="specifications__value">
          {product.specs?.selfieCamera}
        </div>
      </div>
    </div>
  </div>
  );
}
