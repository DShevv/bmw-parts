"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useState } from "react";
import Image from "next/image";
import styles from "./HeroBannerSlider.module.scss";
import "swiper/css";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import clsx from "clsx";
import { BannerT } from "@/types/types";

const HeroBannerSlider = ({ banners }: { banners: BannerT[] }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handleSlideChange = () => {
    if (swiper) {
      console.log(swiper.realIndex);

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
        {banners.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <div className={styles.image}>
              <Image
                src={`${process.env.NEXT_PUBLIC_STORE_URL}/${slide.photo_path}`}
                alt={slide.title}
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h2 className={clsx("h2", styles.title)}>{slide.title}</h2>
              <MainButton
                type="link"
                href={slide.button_link}
                className={styles.button}
              >
                {slide.button_text}
              </MainButton>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.pagination}>
        {banners.map((_, index) => (
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
