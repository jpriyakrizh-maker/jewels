import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import JewelleryCard from "./JewelleryCard";
import jewellery from "../data/jewellery";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function JewelleryCarousel() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const cards = carouselRef.current?.querySelectorAll(".jewellery-card");

    if (!cards) return;

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 60,
        scale: 0.94,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section className="jewellery-section">
      <div className="jewellery-heading">
        <div>
          <span className="section-label">CURATED COLLECTION</span>

          <h1>
            Timeless
            <span> Jewellery</span>
          </h1>
        </div>

        <p>
          Discover elegant gold and diamond pieces
          designed to make every moment special.
        </p>
      </div>

      <div className="carousel-wrapper" ref={carouselRef}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          speed={900}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
          }}
          className="jewellery-swiper"
        >
          {jewellery.map((item, index) => (
            <SwiperSlide key={item.id}>
              <JewelleryCard
                item={item}
                index={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default JewelleryCarousel;