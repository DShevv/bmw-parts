import { categories } from "@/data/dumpy-data";
import styles from "./CatalogCategories.module.scss";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
const CatalogCategories = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={clsx("h2", styles.title)}>Каталог товаров</h2>
      </div>

      <div className={styles.content}>
        {categories.map((category) => (
          <Link
            href={`/catalog/${category.id}`}
            key={category.id}
            className={styles.item}
          >
            <Image src={category.image} alt={category.name} />
            <div className={clsx("h4", styles.title)}>{category.name}</div>
          </Link>
        ))}
        {categories.map((category) => (
          <Link
            href={`/catalog/${category.id}`}
            key={category.id}
            className={styles.item}
          >
            <Image src={category.image} alt={category.name} />
            <div className={clsx("h4", styles.title)}>{category.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CatalogCategories;
