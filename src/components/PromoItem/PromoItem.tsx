"use client";
import styles from "./PromoItem.module.scss";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import MainButton from "../Buttons/MainButton/MainButton";
import { NewsT } from "@/types/types";
import { formatDate } from "@/utils/helper";

const PromoItem = ({ promotion }: { promotion: NewsT }) => {
  return (
    <Link href={`/promotions/${promotion.slug}`} className={clsx(styles.item)}>
      <Image
        src={`${process.env.NEXT_PUBLIC_STORE_URL}/${promotion.image}`}
        alt={promotion.title}
        width={268}
        height={237}
        className={styles.image}
      />
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={clsx(styles.date, "body-3")}>
            {formatDate(promotion.created_at)}
          </div>
          <div className={clsx(styles.title, "h4")}>{promotion.title}</div>
        </div>

        <MainButton className={styles.button}>Подробнее</MainButton>
      </div>
    </Link>
  );
};

export default PromoItem;
