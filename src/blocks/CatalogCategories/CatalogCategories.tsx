import styles from "./CatalogCategories.module.scss";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { CategoryT } from "@/types/types";

const CatalogCategories = async ({
  categories,
}: {
  categories: CategoryT[];
}) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={clsx("h2", styles.title)}>Каталог товаров</h2>
      </div>

      <div className={styles.content}>
        {categories?.map((category) => (
          <Link
            href={`/catalog/${category.slug}`}
            key={category.id}
            className={styles.item}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_STORE_URL}/${category.photo_path}`}
              alt={category.name}
              width={274}
              height={200}
            />
            <div className={clsx("h4", styles.title)}>{category.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CatalogCategories;
