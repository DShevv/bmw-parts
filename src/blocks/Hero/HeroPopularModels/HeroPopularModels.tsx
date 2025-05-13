"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Grid } from "swiper/modules";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HeroPopularModels.module.scss";
import "swiper/css";
import "swiper/css/grid";
import clsx from "clsx";
import { series } from "@/data/dumpy-data";
import Link from "next/link";
import IconButton from "@/components/Buttons/IconButton/IconButton";

const HeroPopularModels = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [swiper2, setSwiper2] = useState<SwiperType | null>(null);

  const handleSlideChange = () => {
    if (swiper && swiper2) {
      setActiveIndex(swiper.realIndex);
    }
  };

  useEffect(() => {
    if (swiper && swiper2) {
      swiper2.slideTo(activeIndex);
    }
  }, [swiper, swiper2, activeIndex]);

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
        <Swiper
          slidesPerView={2}
          spaceBetween={12}
          modules={[Grid]}
          grid={{
            rows: 3,
            fill: "row",
          }}
          slidesPerGroup={3}
          breakpoints={{
            768: {
              slidesPerView: "auto",
              spaceBetween: 52,
              grid: {
                rows: 1,
              },
              slidesPerGroup: 1,
            },
          }}
          onSwiper={setSwiper2}
          className={styles.infoSwiper}
        >
          {series.map((slide, index) => (
            <SwiperSlide
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
            </SwiperSlide>
          ))}
          {series.map((slide, index) => (
            <SwiperSlide
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
            </SwiperSlide>
          ))}
          {series.map((slide, index) => (
            <SwiperSlide
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
            </SwiperSlide>
          ))}
          {series.map((slide, index) => (
            <SwiperSlide
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
            </SwiperSlide>
          ))}
        </Swiper>

        <IconButton type="link" href="/catalog" className={styles.button}>
          все модели
        </IconButton>
      </div>
    </div>
  );
};

export default HeroPopularModels;
