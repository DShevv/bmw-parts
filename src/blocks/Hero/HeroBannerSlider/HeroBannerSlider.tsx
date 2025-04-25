"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useState } from "react";
import Image from "next/image";

import styles from "./HeroBannerSlider.module.scss";
import "swiper/css";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { HeroSlides } from "@/data/dumpy-data";
import clsx from "clsx";

const HeroBannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handleSlideChange = () => {
    if (swiper) {
      setActiveIndex(swiper.realIndex);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        loop={true}
        className={styles.swiper}
      >
        {HeroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <div className={styles.image}>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h2 className={clsx("h2", styles.title)}>{slide.title}</h2>
              <MainButton type="link" href="/catalog" className={styles.button}>
                Перейти в каталог
              </MainButton>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.pagination}>
        {HeroSlides.map((_, index) => (
          <button
            key={index}
            className={clsx(styles.paginationBullet, {
              [styles.active]: index === activeIndex,
            })}
            onClick={() => swiper?.slideTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBannerSlider;
