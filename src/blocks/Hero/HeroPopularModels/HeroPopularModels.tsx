"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./HeroPopularModels.module.scss";
import "swiper/css";
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
  const [activeSeries, setActiveSeries] = useState<SeriesT | null>(series[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className={styles.wrapper}>
      <h2 className={clsx("h2", styles.title)}>Популярные модели</h2>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={12}
        initialSlide={0}
        breakpoints={{
          768: {
            spaceBetween: 18,
            slidesPerView: 6,
          },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        className={styles.swiper}
        grabCursor={true}
        centeredSlides={false}
        loop={false}
      >
        {series.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className={clsx(styles.slide, {
              [styles.active]: activeSeries?.id === slide.id,
            })}
          >
            <div
              className={styles.content}
              onClick={() => setActiveSeries(slide)}
            >
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
          onClick={() => {
            const newIndex = Math.max(currentSlide - 1, 0);
            swiperRef.current?.slideTo(newIndex);
          }}
        />
        <ArrowButton
          className={styles.next}
          onClick={() => {
            const newIndex = Math.min(currentSlide + 1, series.length - 1);
            swiperRef.current?.slideTo(newIndex);
          }}
        />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.infoSwiper}>
          {generations
            .filter((generation) => generation.series_id === activeSeries?.id)
            ?.map((slide) => (
              <div key={slide.id} className={clsx(styles.infoItem)}>
                <Link
                  href={`/catalog/all?series=${activeSeries?.slug}&generation=${slide.slug}`}
                  className={clsx("h4", styles.infoTitle)}
                >
                  {slide.name}
                </Link>
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
