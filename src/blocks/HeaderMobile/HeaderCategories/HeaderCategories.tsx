"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import styles from "./HeaderCategories.module.scss";
import "swiper/css";
import "swiper/css/free-mode";
import { categoriesData } from "@/data/dumpy-data";
import Link from "next/link";
import clsx from "clsx";

const HeaderCategories = () => {
  return (
    <div className={styles.container}>
      <Swiper
        modules={[FreeMode]}
        slidesPerView={"auto"}
        spaceBetween={16}
        breakpoints={{
          768: {
            spaceBetween: 24,
          },
        }}
        freeMode
        className={styles.swiper}
      >
        {categoriesData.map((category) => (
          <SwiperSlide key={category.id} className={styles.swiperSlide}>
            <Link
              href={`/categories/${category.id}`}
              className={styles.category}
            >
              <category.image />

              <div className={clsx("body-2", styles.categoryName)}>
                {category.name}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeaderCategories;
