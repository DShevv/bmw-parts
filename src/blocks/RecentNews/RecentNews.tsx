"use client";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import styles from "./RecentNews.module.scss";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import NewsItem from "@/components/NewsItem/NewsItem";
import { NewsT } from "@/types/types";

const RecentNews = ({ title, news }: { title?: string; news: NewsT[] }) => {
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
        <h2 className={clsx("h2", styles.title)}>
          {title || "Последние новости"}
        </h2>
        <MainButton
          type="link"
          href="/promotions"
          style="secondary"
          className={styles.button}
        >
          Все новости
        </MainButton>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        className={styles.slider}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {news.map((promotion) => (
          <SwiperSlide key={promotion.id} className={styles.slide}>
            <NewsItem promotion={promotion} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.navigation}>
        <ArrowButton
          name="prev-news"
          className={styles.prev}
          onClick={handlePrev}
        />
        <ArrowButton
          name="next-news"
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
        Все новости
      </MainButton>
    </div>
  );
};

export default RecentNews;
