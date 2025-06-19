import clsx from "clsx";
import styles from "./Hero.module.scss";
import HeroBannerSlider from "./HeroBannerSlider/HeroBannerSlider";
import Link from "next/link";
import { getCategories } from "@/services/CatalogService";
import Image from "next/image";
import { BannerT } from "@/types/types";

const Hero = async ({ banners }: { banners: BannerT[] }) => {
  const categories = await getCategories();

  return (
    <section className={styles.hero}>
      <h1 className={clsx("h1", styles.title)}>
        Автозапчасти и аксессуары для BMW в Минске
      </h1>

      <div className={styles.container}>
        <HeroBannerSlider banners={banners} />
        <div className={styles.categories}>
          {categories?.map((category) => (
            <Link
              href={`catalog/${category.slug}`}
              className={styles.category}
              key={category.id}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STORE_URL}/${category?.icon_path}`}
                alt={`${category.name} иконка`}
                width={34}
                height={34}
              />
              <div className={clsx(styles.categoryTitle, "body-1")}>
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
