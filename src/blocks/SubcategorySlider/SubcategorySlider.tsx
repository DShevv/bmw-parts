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
import { CategoryT } from "@/types/types";
import { useSearchParams } from "next/navigation";

const SubcategorySlider = ({
  slug,
  categories,
  categoryData,
}: {
  slug: string;
  categories: CategoryT[];
  categoryData: CategoryT | null;
}) => {
  const swiperRef = useRef<SwiperType>(null);
  const searchParams = useSearchParams();

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const getCategoriesToShow = () => {
    if (slug === "all") {
      return categories;
    }

    if (categoryData?.subcategories && categoryData.subcategories.length > 0) {
      return categoryData.subcategories;
    }

    const parentCategory = categories.find((cat) =>
      cat.subcategories?.some((subcat) => subcat.slug === slug)
    );

    if (parentCategory?.subcategories) {
      return parentCategory.subcategories;
    }

    return categories;
  };

  const categoriesToShow = getCategoriesToShow();

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
            href={`/catalog/all?${searchParams.toString()}`}
            className={clsx(styles.item, {
              [styles.active]: slug === "all",
            })}
          >
            Все товары
          </Link>
        </SwiperSlide>

        {categoriesToShow.map((category) => (
          <SwiperSlide key={category.id} className={clsx("h4", styles.slide)}>
            <Link
              href={`/catalog/${category.slug}?${searchParams.toString()}`}
              className={clsx(styles.item, {
                [styles.active]: category.slug === slug,
              })}
            >
              {category.name}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.navigation}>
        <ArrowButton
          name="prev-subcategory"
          className={styles.prev}
          onClick={handlePrev}
        />
        <ArrowButton
          name="next-subcategory"
          className={styles.next}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default SubcategorySlider;
