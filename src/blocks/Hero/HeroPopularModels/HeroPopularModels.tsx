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
import Link from "next/link";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import { SeriesT, GenerationT } from "@/types/types";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";

interface HeroPopularModelsProps {
  series: SeriesT[];
  generations: GenerationT[];
}

const HeroPopularModels = ({ series, generations }: HeroPopularModelsProps) => {
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
        {series.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className={clsx(styles.slide, {
              [styles.active]: activeIndex === slide.id - 1,
            })}
            onClick={() => {
              setActiveIndex(slide.id - 1);
              swiper?.slideTo(slide.id - 1);
            }}
          >
            <div className={styles.content}>
              <Image
                src={`${process.env.NEXT_PUBLIC_STORE_URL}/${slide.image_path}`}
                alt={slide.name}
                className={styles.image}
                width={104}
                height={60}
              />
              <h2 className={clsx("body-3", styles.slideTitle)}>
                {slide.name}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.navigation}>
        <ArrowButton
          className={styles.prev}
          onClick={() => swiper?.slidePrev()}
        />
        <ArrowButton
          className={styles.next}
          onClick={() => swiper?.slideNext()}
        />
      </div>

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
          {series.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className={clsx(styles.infoItem, {
                [styles.active]: activeIndex === slide.id,
              })}
            >
              <div className={clsx("h4", styles.infoTitle)}>{slide.name}</div>
              <ul className={styles.infoList}>
                {generations
                  .filter((generation) => generation.series_id === slide.id)
                  .map((generation) => (
                    <li key={generation.id} className={styles.infoItem}>
                      <Link
                        href={`/catalog/all?series=${slide.slug}&generation=${generation.slug}`}
                        className={clsx("body-2", styles.infoTitle)}
                      >
                        {generation.name}
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
