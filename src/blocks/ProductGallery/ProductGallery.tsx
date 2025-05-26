"use client";
import styles from "./ProductGallery.module.scss";
import { useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { FreeMode, Thumbs, Zoom, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";

interface ProductGalleryProps {
  images: string[];
  className?: string;
}

const ProductGallery = ({ images, className }: ProductGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  const handleThumbClick = (index: number) => {
    if (mainSwiper) {
      mainSwiper.slideTo(index);
    }
  };

  const handlePrev = () => {
    if (mainSwiper) {
      mainSwiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (mainSwiper) {
      mainSwiper.slideNext();
    }
  };

  return (
    <div className={clsx(styles.container, className)}>
      <Swiper
        className={clsx(styles.zoom)}
        spaceBetween={10}
        navigation={true}
        zoom={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Zoom]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={setMainSwiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.zoomItem}>
            <div className="swiper-zoom-container">
              <Image
                src={`${process.env.NEXT_PUBLIC_STORE_URL}/${image}`}
                alt={""}
                width={1000}
                height={1000}
                className={styles.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        direction="horizontal"
        slidesPerView={"auto"}
        freeMode={true}
        mousewheel={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs, Mousewheel]}
        className={clsx(styles.thumbs)}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className={clsx(styles.thumb, {
              [styles.active]: index === activeIndex,
            })}
            onClick={() => handleThumbClick(index)}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_STORE_URL}/${image}`}
              alt={""}
              width={1000}
              height={1000}
              className={styles.image}
            />
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

export default ProductGallery;
