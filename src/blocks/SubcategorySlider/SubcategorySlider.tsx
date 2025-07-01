"use client";
import styles from "./SubcategorySlider.module.scss";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import Link from "next/link";
import { CategoryT } from "@/types/types";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const SubcategorySlider = ({
  slug,
  categories,
  categoryData,
}: {
  slug: string;
  categories: CategoryT[];
  categoryData: CategoryT | null;
}) => {
  const searchParams = useSearchParams();

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
      <Swiper slidesPerView={"auto"} className={styles.slider}>
        <SwiperSlide className={clsx("body-3", styles.slide)}>
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
          <SwiperSlide
            key={category.id}
            className={clsx("body-3", styles.slide)}
          >
            <Link
              href={`/catalog/${category.slug}?${searchParams.toString()}`}
              className={clsx(styles.item, {
                [styles.active]: category.slug === slug,
              })}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STORE_URL}/${category.photo_path}`}
                alt={category.name}
                width={24}
                height={24}
              />
              <span>{category.name}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.table}>
        <div className={clsx("body-3", styles.slide)}>
          <Link
            href={`/catalog/all?${searchParams.toString()}`}
            className={clsx(styles.item, {
              [styles.active]: slug === "all",
            })}
          >
            Все товары
          </Link>
        </div>

        {categoriesToShow.map((category) => (
          <div key={category.id} className={clsx("body-3", styles.slide)}>
            <Link
              href={`/catalog/${category.slug}?${searchParams.toString()}`}
              className={clsx(styles.item, {
                [styles.active]: category.slug === slug,
              })}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STORE_URL}/${category.photo_path}`}
                alt={category.name}
                width={24}
                height={24}
              />
              <span>{category.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategorySlider;
