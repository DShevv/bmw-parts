import Link from "next/link";
import styles from "./Pagination.module.scss";
import clsx from "clsx";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton";

interface PaginationProps {
  current: number;
  max: number;
  maxPerView: number;
  className?: string;
}

const Pagination = ({
  current,
  max,
  maxPerView,
  className,
}: PaginationProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      {current > 1 && (
        <ArrowButton
          disabled={current === 1}
          type="link"
          href={`?page=${current - 1}`}
          className={styles.prev}
        />
      )}
      <div className={clsx(styles.list)}>
        {Array.from({ length: max }, (_, i) => i + 1)
          .filter((_, index) => {
            if (index - current > Math.floor(maxPerView / 2) - 1) return false;
            if (current - index > Math.floor(maxPerView / 2) + 1) return false;
            return true;
          })
          .map((elem) => {
            const pageNumber = elem;
            if (elem > max) return null;
            return (
              <Link
                key={pageNumber}
                className={clsx("h2", styles.page, {
                  [styles.active]: elem === current,
                })}
                href={`?page=${pageNumber}`}
              >
                {pageNumber}
              </Link>
            );
          })}
      </div>

      {current < max && (
        <ArrowButton
          disabled={current === max}
          type="link"
          href={`?page=${current + 1}`}
          className={styles.next}
        />
      )}
    </div>
  );
};

export default Pagination;
