"use client";
import styles from "./SubcategorySlider.module.scss";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import Link from "next/link";
import { slugifyWithOpts } from "@/utils/helper";

const SubcategorySlider = ({
  slug,
  categories,
}: {
  slug: string;
  categories: string[];
}) => {
  const swiperRef = useRef<SwiperType>(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className={styles.wrapper}>
      <Swiper
        slidesPerView={"auto"}
        className={styles.slider}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide className={clsx("h4", styles.slide)}>
          <Link
            href={`/catalog/all`}
            className={clsx(styles.item, {
              [styles.active]: slug === "all",
            })}
          >
            Все товары
          </Link>
        </SwiperSlide>
        {categories.map((category, index) => (
          <SwiperSlide key={index} className={clsx("h4", styles.slide)}>
            <Link
              href={`/catalog/${slugifyWithOpts(category)}`}
              className={clsx(styles.item, {
                [styles.active]: slugifyWithOpts(category) === slug,
              })}
            >
              {category}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.navigation}>
        <ArrowButton className={styles.prev} onClick={handlePrev} />
        <ArrowButton className={styles.next} onClick={handleNext} />
      </div>
    </div>
  );
};

export default SubcategorySlider;
