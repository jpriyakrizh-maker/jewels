import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";

import "swiper/css";

import jewellery from "../data/jewellery";

function JewelleryStack({ onSelect }) {
  const swiperRef = useRef(null);
  const introDone = useRef(false);

  const getPosition = (diff) => {
    const positions = {
      0: {
        x: 0,
        y: 0,
        rotation: 0,
        zIndex: 70,
      },

      "-1": {
        x: -85,
        y: 12,
        rotation: -5,
        zIndex: 60,
      },

      "1": {
        x: 85,
        y: 12,
        rotation: 5,
        zIndex: 60,
      },

      "-2": {
        x: -165,
        y: 24,
        rotation: -8,
        zIndex: 50,
      },

      "2": {
        x: 165,
        y: 24,
        rotation: 8,
        zIndex: 50,
      },

      "-3": {
        x: -245,
        y: 38,
        rotation: -11,
        zIndex: 40,
      },

      "3": {
        x: 245,
        y: 38,
        rotation: 11,
        zIndex: 40,
      },
    };

    return (
      positions[diff] || {
        x: 0,
        y: 0,
        rotation: 0,
        zIndex: 1,
      }
    );
  };

  const revealCards = (swiper) => {
    if (!swiper?.slides?.length) return;

    const centerIndex = swiper.activeIndex;

    introDone.current = false;

    /* --------------------------------
       HIDE ALL CARDS
    -------------------------------- */

    swiper.slides.forEach((slide) => {
      const card = slide.querySelector(".jewel-card");

      if (!card) return;

      gsap.set(card, {
        opacity: 0,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
      });

      slide.style.zIndex = 1;
    });

    /* --------------------------------
       CENTER CARD
    -------------------------------- */

    const centerSlide = swiper.slides[centerIndex];

    const centerCard =
      centerSlide?.querySelector(".jewel-card");

    if (!centerCard) return;

    centerSlide.style.zIndex = 70;

    gsap.set(centerCard, {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
    });

    /* --------------------------------
       PREPARE SIDE CARDS
    -------------------------------- */

    swiper.slides.forEach((slide, index) => {
      const card = slide.querySelector(".jewel-card");

      if (!card || index === centerIndex) return;

      const diff = index - centerIndex;
      const position = getPosition(diff);

      slide.style.zIndex = position.zIndex;

      gsap.set(card, {
        opacity: 0,
        x: position.x,
        y: position.y,
        rotation: position.rotation,
        scale: 1,
      });
    });

    /* --------------------------------
       REVEAL ANIMATION
    -------------------------------- */

    const timeline = gsap.timeline({
      onComplete: () => {
        introDone.current = true;
      },
    });

    const revealOrder = [
      -1,
      1,
      -2,
      2,
      -3,
      3,
    ];

    revealOrder.forEach((diff, index) => {
      const cardIndex = centerIndex + diff;

      if (
        cardIndex < 0 ||
        cardIndex >= swiper.slides.length
      ) {
        return;
      }

      const card =
        swiper.slides[cardIndex]?.querySelector(
          ".jewel-card"
        );

      if (!card) return;

      timeline.to(
        card,
        {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        index * 0.22
      );
    });
  };

  /* --------------------------------
     NORMAL SWIPE ANIMATION
  -------------------------------- */

  const animateCards = (swiper) => {
    if (!swiper?.slides?.length) return;

    swiper.slides.forEach((slide, index) => {
      const card = slide.querySelector(".jewel-card");

      if (!card) return;

      const diff = index - swiper.activeIndex;

      if (diff < -3 || diff > 3) {
        gsap.to(card, {
          opacity: 0,
          duration: 0.25,
        });

        slide.style.zIndex = 1;

        return;
      }

      const position = getPosition(diff);

      slide.style.zIndex = position.zIndex;

      gsap.to(card, {
        x: position.x,
        y: position.y,
        rotation: position.rotation,
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
      });
    });
  };

  useEffect(() => {
    if (!swiperRef.current) return;

    const timer = setTimeout(() => {
      revealCards(swiperRef.current);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="collection-section">

      {/* =========================
          HEADING
      ========================= */}

      <div className="collection-heading">

        <span>THE ART OF</span>

        <h1>COLLECTIONS</h1>

        <p>
          Seven expressions of timeless elegance.
        </p>

      </div>


      {/* =========================
          JEWELLERY CARDS
      ========================= */}

      <div className="jewellery-stack-wrapper">

        <Swiper
          className="jewellery-swiper"

          slidesPerView={7}

          centeredSlides={true}

          spaceBetween={0}

          initialSlide={3}

          speed={700}

          grabCursor={true}

          watchSlidesProgress={true}

          breakpoints={{
            320: {
              slidesPerView: 1,
            },

            600: {
              slidesPerView: 3,
            },

            900: {
              slidesPerView: 5,
            },

            1200: {
              slidesPerView: 7,
            },
          }}

          onSwiper={(swiper) => {
            swiperRef.current = swiper;

            setTimeout(() => {
              revealCards(swiper);
            }, 300);
          }}

          onSlideChange={(swiper) => {
            if (introDone.current) {
              animateCards(swiper);
            }
          }}

          onTouchEnd={(swiper) => {
            if (introDone.current) {
              animateCards(swiper);
            }
          }}
        >

          {jewellery.map((item) => (
            <SwiperSlide key={item.id}>

              <div
                className="jewel-card"
                onClick={() => onSelect(item)}
              >

                {/* BLUE BOTTOM SHAPE */}

                <div className="glass-blue-shape"></div>


                {/* JEWELLERY */}

                <div className="jewel-image-wrap">

                  <img
                    src={item.image}
                    alt={item.name}
                    draggable="false"
                  />

                </div>


                {/* HIDDEN CARD INFO */}

                <div className="jewel-card-info">

                  <span>
                    {item.category}
                  </span>

                  <h3>
                    {item.name}
                  </h3>

                  <strong>
                    {item.price}
                  </strong>

                </div>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>

      </div>


      {/* =========================
          BOTTOM HINT
      ========================= */}

      <div className="collection-hint">

        <span>SWIPE</span>

        <div className="hint-line"></div>

        <span>DISCOVER</span>

      </div>

    </section>
  );
}

export default JewelleryStack;