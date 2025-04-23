import Link from "next/link";
import styles from "./Breadcrumbs.module.scss";
import clsx from "clsx";

interface BreadcrumbsProps {
  items: { title: string; href: string }[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      {items.map((item, index) => (
        <div key={`${index}${item.title}`} className="body-2">
          {items.length > index + 1 ? (
            <Link
              key={`${index}${item.title}`}
              href={item.href}
              className={clsx("body-2", styles.link)}
            >
              {item.title}
            </Link>
          ) : (
            <div className={clsx("body-1", styles.link)}>{item.title}</div>
          )}
          {index < items.length - 1 && (
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="3" cy="3" r="3" fill="#EE551D" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
