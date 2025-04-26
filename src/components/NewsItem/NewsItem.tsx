import styles from "./NewsItem.module.scss";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import MainButton from "../Buttons/MainButton/MainButton";
import { PromotionT } from "@/types/types";
import { motion as m } from "motion/react";

const NewsItem = ({ promotion }: { promotion: PromotionT }) => {
  return (
    <m.div whileHover="hover" initial="initial">
      <Link href={`/promotion/${promotion.id}`} className={clsx(styles.item)}>
        <Image
          src={promotion.image}
          alt={promotion.title}
          width={268}
          height={237}
          className={styles.image}
        />
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={clsx(styles.date, "body-3")}>{promotion.date}</div>
            <div className={clsx(styles.title, "h4")}>{promotion.title}</div>
          </div>

          <m.div
            className={styles.button}
            variants={{
              initial: { height: 0, opacity: 0 },
              hover: { height: "auto", opacity: 1 },
            }}
            transition={{ duration: 0.3 }}
          >
            <MainButton className={styles.button}>Подробнее</MainButton>
          </m.div>
        </div>
      </Link>
    </m.div>
  );
};

export default NewsItem;
