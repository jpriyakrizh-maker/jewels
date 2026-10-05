import { motion } from "framer-motion";
import { Heart, ArrowUpRight } from "lucide-react";

function JewelleryCard({ item, index }) {
  return (
    <motion.article
      className="jewellery-card"
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -10,
      }}
    >
      <div className="jewellery-image-wrap">
        <img
          src={item.image}
          alt={item.name}
          className="jewellery-image"
        />

        <button
          className="wishlist-btn"
          aria-label="Add to wishlist"
        >
          <Heart
            size={18}
            strokeWidth={1.6}
          />
        </button>

        <div className="view-btn">
          <ArrowUpRight
            size={19}
            strokeWidth={1.7}
          />
        </div>
      </div>

      <div className="jewellery-details">
        <span className="jewellery-category">
          {item.category}
        </span>

        <h3>{item.name}</h3>

        <div className="jewellery-bottom">
          <span className="jewellery-price">
            {item.price}
          </span>

          <span className="shop-text">
            View Product
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default JewelleryCard;