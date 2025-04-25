"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useState } from "react";
import Image from "next/image";
import styles from "./HeroPopularModels.module.scss";
import "swiper/css";

import clsx from "clsx";
import { series } from "@/data/dumpy-data";
import Link from "next/link";
import IconButton from "@/components/Buttons/IconButton/IconButton";

const HeroPopularModels = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handleSlideChange = () => {
    if (swiper) {
      setActiveIndex(swiper.realIndex);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={clsx("h2", styles.title)}>Популярные модели</h2>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={12}
        breakpoints={{
          768: {
            spaceBetween: 20,
          },
        }}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        className={styles.swiper}
      >
        {series.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className={clsx(styles.slide, {
              [styles.active]: activeIndex === index,
            })}
            onClick={() => {
              setActiveIndex(index);
              swiper?.slideTo(index);
            }}
          >
            <div className={styles.content}>
              <Image
                src={slide.image}
                alt={slide.title}
                className={styles.image}
                width={104}
                height={60}
              />
              <h2 className={clsx("body-3", styles.slideTitle)}>
                {slide.title}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          {series.map((slide, index) => (
            <div
              key={slide.id}
              className={clsx(styles.infoItem, {
                [styles.active]: activeIndex === index,
              })}
            >
              <h4 className={clsx("h4", styles.infoTitle)}>{slide.title}</h4>
              <ul className={styles.infoList}>
                {slide.models.map((model) => (
                  <li key={model.id} className={styles.infoItem}>
                    <Link
                      href={`/catalog/${model.id}`}
                      className={clsx("body-2", styles.infoTitle)}
                    >
                      {model.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <IconButton type="link" href="/catalog" className={styles.button}>
          все модели
        </IconButton>
      </div>
    </div>
  );
};

export default HeroPopularModels;
