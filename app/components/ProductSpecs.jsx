
import "./../styles/components/_product-detail.scss";

export default function ProductSpecs({product}) {
  return (
    <div className="product-detail__specifications">
    <h2 className="product-detail__section-title">SPECIFICATIONS</h2>
    <div className="specifications-table">
    <div className="specifications-row">
        <div className="specifications-label">Brand</div>
        <div className="specifications-value">
          {product.brand}
        </div>
      </div>
      <div className="specifications-row">
        <div className="specifications-label">Name</div>
        <div className="specifications-value">
          {product.name}
        </div>
      </div>
      <div className="specifications-row">
        <div className="specifications-label">Description</div>
        <div className="specifications-value">
          {product.description}
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
  );
}
