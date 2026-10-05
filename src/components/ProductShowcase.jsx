import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import jewellery from "../data/jewellery";

function ProductShowcase({ startIndex = 0, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [visible, setVisible] = useState(true);

  const product = jewellery[currentIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        if (currentIndex === jewellery.length - 1) {
          onComplete();
          return;
        }

        setCurrentIndex((prev) => prev + 1);
        setVisible(true);
      }, 450);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, onComplete]);

  return (
    <section className="single-product-section">

      <div
        className={`single-product-card ${
          visible ? "product-visible" : "product-hidden"
        }`}
      >

        {/* IMAGE SIDE */}
        <div className="single-product-image-area">

          <div className="image-number">
            <span>
              {String(currentIndex + 1).padStart(2, "0")}
            </span>

            <small>/ 07</small>
          </div>

          <div className="image-blue-shadow"></div>

          <img
            src={product.image}
            alt={product.name}
            className="single-product-image"
          />

        </div>


        {/* DETAILS SIDE */}
        <div className="single-product-details">

          <span className="single-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="detail-line"></div>

          <p>
            A refined expression of contemporary jewellery,
            designed with delicate detailing and timeless elegance.
          </p>

          <div className="single-price">
            {product.price}
          </div>

          <button className="add-cart-button">
            <ShoppingBag size={18} />

            <span>ADD TO CART</span>
          </button>

          <div className="auto-progress">

            <div className="auto-progress-track">
              <div className="auto-progress-fill"></div>
            </div>

            <span>
              {String(currentIndex + 1).padStart(2, "0")} / 07
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductShowcase;