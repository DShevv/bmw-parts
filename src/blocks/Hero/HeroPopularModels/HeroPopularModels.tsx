"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useState } from "react";
import Image from "next/image";
import styles from "./HeroPopularModels.module.scss";
import "swiper/css";
import clsx from "clsx";
import Link from "next/link";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import { SeriesT, GenerationT, BodyT } from "@/types/types";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";

interface HeroPopularModelsProps {
  series: SeriesT[];
  generations: GenerationT[];
  bodies: BodyT[];
}

const HeroPopularModels = ({
  series,
  generations,
  bodies,
}: HeroPopularModelsProps) => {
  const [activeSeries, setActiveSeries] = useState<SeriesT | null>(series[0]);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handelSlideChange = (swiper: SwiperType) => {
    setActiveSeries(series[swiper.realIndex]);
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
        onSlideChange={handelSlideChange}
        className={styles.swiper}
      >
        {series.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className={clsx(styles.slide, {
              [styles.active]: activeSeries?.id === slide.id,
            })}
            onClick={() => {
              setActiveSeries(slide);
              swiper?.slideTo(index);
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
                <ul className={styles.infoList}>
                  {bodies
                    .filter((body) => body.generation_id === slide.id)
                    .map((body) => (
                      <li key={body.id} className={styles.infoItem}>
                        <Link
                          href={`/catalog/all?series=${activeSeries?.slug}&generation=${slide.slug}&body=${body.slug}`}
                          className={clsx("body-2", styles.infoTitle)}
                        >
                          {body.name}
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
