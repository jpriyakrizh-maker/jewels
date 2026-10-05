import { useEffect, useState } from "react";
import "./App.css";

const products = [
  {
    name: "Golden Ring",
    price: "15,000",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Elegant Necklace",
    price: "18,900",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Classic Bracelet",
    price: "14,900",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Diamond Earrings",
    price: "19,900",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Diamond Pendant",
    price: "1,50,000",
    image:
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Gold Chain",
    price: "1,20,000",
    image:
      "https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Gold Bangle",
    price: "24,900",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=90",
  },
];

function App() {

  const [stage, setStage] = useState("ring");
  const [productIndex, setProductIndex] = useState(0);

  useEffect(() => {
    let timer;

    /* ---------------- RING ---------------- */

    if (stage === "ring") {
      timer = setTimeout(() => {
        setStage("necklace");
      }, 2500);
    }

    /* ---------------- NECKLACE ---------------- */

    else if (stage === "necklace") {
      timer = setTimeout(() => {
        setStage("collection");
      }, 2500);
    }

    /* ---------------- WHOLE 7 PRODUCTS ---------------- */

    else if (stage === "collection") {
      timer = setTimeout(() => {
        setProductIndex(0);
        setStage("product");
      }, 5000);
    }

    /* ---------------- INDIVIDUAL PRODUCTS ---------------- */

    else if (stage === "product") {
      timer = setTimeout(() => {
        if (productIndex < products.length - 1) {
          setProductIndex((prev) => prev + 1);
        } else {
          setProductIndex(0);
          setStage("ring");
        }
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [stage, productIndex]);

  return (
    <main className="page">

      {/* =================================================
          1. RING ONLY
      ================================================= */}

      {stage === "ring" && (
        <section className="intro-stage">

          <div className="intro-card ring-card">
            <img
              src={products[0].image}
              alt={products[0].name}
            />
          </div>

        </section>
      )}

      {/* =================================================
          2. NECKLACE ONLY
      ================================================= */}

      {stage === "necklace" && (
        <section className="intro-stage">

          <div className="intro-card necklace-card">
            <img
              src={products[1].image}
              alt={products[1].name}
            />
          </div>

        </section>
      )}

      {/* =================================================
          3. WHOLE 7 PRODUCT COLLECTION
      ================================================= */}

      {stage === "collection" && (
        <section className="collection-stage">

          <div className="collection-title">
            <span>The Ultimate</span>
            <h1>COLLECTIONS</h1>
          </div>

          <div className="collection-products">

            {products.map((product, index) => (
              <div
                key={product.name}
                className={`collection-card collection-card-${index + 1}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>
            ))}

          </div>

          <p className="collection-bottom-text">
            Gold & Diamond Jewellery
          </p>

        </section>
      )}

      {/* =================================================
          4. INDIVIDUAL PRODUCT
      ================================================= */}

      {stage === "product" && (
        <section className="individual-stage">

          <div className="individual-product">

            {/* WHITE CARD ONLY HERE */}

            <div className="individual-image-card">

              <div className="back-card back-card-one"></div>
              <div className="back-card back-card-two"></div>

              <img
                src={products[productIndex].image}
                alt={products[productIndex].name}
              />

            </div>

            <div className="individual-info">

              <span>JEWELLERY COLLECTION</span>

              <h1>
                {products[productIndex].name}
              </h1>

              <p className="individual-price">
                {products[productIndex].price}
              </p>

              <button>
                ADD TO CART
              </button>

            </div>

          </div>

        </section>
      )}

    </main>
  );
}

export default App;