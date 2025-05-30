"use client";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import styles from "./PopularSlider.module.scss";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import ProductItem from "@/components/ProductItem/ProductItem";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import { Grid } from "swiper/modules";
import { ProductT } from "@/types/types";

const PopularSlider = ({
  title,
  products,
}: {
  title?: string;
  products: ProductT[];
}) => {
  const swiperRef = useRef<SwiperType>(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  // Группируем товары по два
  const groupedProducts = products.reduce<ProductT[][]>(
    (acc, product, index) => {
      if (index % 2 === 0) {
        acc.push([product]);
      } else {
        acc[acc.length - 1].push(product);
      }
      return acc;
    },
    []
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={clsx("h2", styles.title)}>
          {title ?? "Популярные товары"}
        </h2>
        {!title && (
          <MainButton
            type="link"
            href="/catalog"
            style="secondary"
            className={styles.button}
          >
            В каталог
          </MainButton>
        )}
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
              fill: "row",
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
        {groupedProducts.map((group, groupIndex) => (
          <SwiperSlide key={groupIndex} className={styles.slide}>
            {group.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.navigation}>
        <ArrowButton
          name="prev-item"
          className={styles.prev}
          onClick={handlePrev}
        />
        <ArrowButton
          name="next-item"
          className={styles.next}
          onClick={handleNext}
        />
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
