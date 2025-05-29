"use client";
import styles from "./SingleNewsSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import NewsItem from "@/components/NewsItem/NewsItem";
import { NewsT } from "@/types/types";

const SingleNewsSlider = ({ news }: { news: NewsT[] }) => {
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
        spaceBetween={16}
        breakpoints={{
          768: {
            slidesPerView: 1,
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
    </div>
  );
};

export default SingleNewsSlider;
