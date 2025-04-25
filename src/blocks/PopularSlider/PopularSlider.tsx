"use client";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import styles from "./PopularSlider.module.scss";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import { popularProducts } from "@/data/dumpy-data";
import ProductItem from "@/components/ProductItem/ProductItem";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import { Grid } from "swiper/modules";

const PopularSlider = () => {
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
        <h2 className={clsx("h2", styles.title)}>Популярные товары</h2>
        <MainButton
          type="link"
          href="/catalog"
          style="secondary"
          className={styles.button}
        >
          В каталог
        </MainButton>
      </div>

      <Swiper
        slidesPerView={"auto"}
        grid={{
          rows: 2,
          fill: "row",
        }}
        breakpoints={{
          768: {
            slidesPerView: "auto",
            grid: {
              rows: 1,
            },
          },
        }}
        modules={[Grid]}
        className={styles.slider}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {popularProducts.map((product) => (
          <SwiperSlide key={product.id} className={styles.slide}>
            <ProductItem product={product} />
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
        В каталог
      </MainButton>
    </div>
  );
};

export default PopularSlider;
