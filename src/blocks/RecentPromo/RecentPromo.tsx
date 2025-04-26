"use client";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import styles from "./RecentPromo.module.scss";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { promotions } from "@/data/dumpy-data";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import PromoItem from "@/components/PromoItem/PromoItem";
const RecentPromo = () => {
  const swiperRef = useRef<SwiperType>(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={clsx("h2", styles.title)}>Последние акции</h2>
        <MainButton
          type="link"
          href="/promotions"
          style="secondary"
          className={styles.button}
        >
          Все акции
        </MainButton>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
        }}
        className={styles.slider}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {promotions.map((promotion) => (
          <SwiperSlide key={promotion.id} className={styles.slide}>
            <PromoItem promotion={promotion} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.navigation}>
        <ArrowButton className={styles.prev} onClick={handlePrev} />
        <ArrowButton className={styles.next} onClick={handleNext} />
      </div>
      <MainButton
        type="link"
        href="/catalog"
        style="secondary"
        className={styles.mobileButton}
      >
        Все акции
      </MainButton>
    </div>
  );
};

export default RecentPromo;
