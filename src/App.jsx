import { useEffect, useState } from "react";
import "./App.css";

const products = [
{
  name: "Golden Ring",
  price: "15,000",
  image:
    "https://img.tatacliq.com/images/i25//437Wx649H/MP000000027435853_437Wx649H_202507191354081.jpeg",
},
{
  name: "Elegant Necklace",
  price: "18,900",
  image:
    "https://annachy-prod-assets.annachy.com/pims/products-v1/0142941GRE18INC_2-image1_v1787231249962.webp"},
{
  name: "Classic Bracelet",
  price: "14,900",
  image:
    "https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/MAY/17/FFnHrfaF_e730ecc251224a7fa698e9ba7a0c6436.jpg"},
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
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjr6jFwS2xLhGqfCNeYmrkdBWXupgvng2SowRG6J60T4O9qB14C0HKgtPl&s=10"
},
{
  name: "Gold Earrings",
  price: "24,900",
  image:
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=90",
},
{
  name: "Gold Bangle",
  price: "24,900",
  image:
    "https://www.avsajewels.com/cdn/shop/files/ChatGPT_Image_Jun_30_2026_10_01_59_PM.png?v=1782837136"
}
];
function App() {
  // FIRST SCREEN = WHOLE COLLECTION
  const [stage, setStage] = useState("collection");
  const [productIndex, setProductIndex] = useState(0);

  useEffect(() => {
    let timer;

    /* ---------------- WHOLE 7 PRODUCTS ---------------- */

    if (stage === "collection") {
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
          setStage("collection");
        }
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [stage, productIndex]);

  return (
    <main className="page">

      {/* =================================================
          1. WHOLE 7 PRODUCT COLLECTION
          FIRST SCREEN
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
          2. INDIVIDUAL PRODUCT
      ================================================= */}

      {stage === "product" && (
        <section className="individual-stage">

          <div className="individual-product">

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
