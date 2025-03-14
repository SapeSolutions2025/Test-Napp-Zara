import React from "react";

export const ProductsLoading = () => {
  return (
    <div className="skeleton">
      <div className="skeleton__grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="skeleton__card">
            <div className="skeleton__image"></div>
            <div className="skeleton__content">
              <div className="skeleton__title"></div>
              <div className="skeleton__line"></div>
              <div className="skeleton__line"></div>
              <div className="skeleton__button"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
