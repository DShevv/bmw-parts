import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import PopularSlider from "@/blocks/PopularSlider/PopularSlider";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import ProductGallery from "@/blocks/ProductGallery/ProductGallery";
import wheelHd from "@/assets/images/wheel-hd.png";
import clsx from "clsx";
import ProductControls from "@/components/ProductControls/ProductControls";
import { popularProducts } from "@/data/dumpy-data";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Каталог", href: "/catalog" },
            { title: "Диски", href: "/catalog/discs" },
            {
              title: "Диск колёсный 6 × 15 | 4 × 100 ET48 D54,1 BMW X1",
              href: "/catalog/steel-discs",
            },
          ]}
        />
        <div className={styles.content}>
          <h1 className={clsx("h1", styles.title)}>
            Диск колёсный 6 × 15 | 4 × 100 ET48 D54,1 BMW X1
          </h1>
          <div className={clsx("body-1", styles.isAvailable)}>В наличии</div>

          <ProductGallery
            images={[wheelHd, wheelHd, wheelHd, wheelHd, wheelHd]}
          />
          <div className={styles.info}>
            <h1 className={clsx("h1", styles.title)}>
              Диск колёсный 6 × 15 | 4 × 100 ET48 D54,1 BMW X1
            </h1>
            <div className={clsx("body-1", styles.isAvailable)}>В наличии</div>
            <div className={styles.specs}>
              <div className={styles.spec}>
                <div className={clsx("body-2", styles.specKey)}>
                  Тип/модель АКПП
                </div>
                <div className={clsx("h3", styles.specValue)}>
                  6HP26, 6HP26A, 6HP26A61, 6HP26X
                </div>
              </div>
              <div className={styles.spec}>
                <div className={clsx("body-2", styles.specKey)}>
                  Производитель
                </div>
                <div className={clsx("h3", styles.specValue)}>ZF</div>
              </div>
              <div className={styles.spec}>
                <div className={clsx("body-2", styles.specKey)}>Номер</div>
                <div className={clsx("h3", styles.specValue)}>1068298034</div>
              </div>
            </div>
            <ProductControls product={popularProducts[0]} />
          </div>
        </div>

        <div className={styles.description}>
          <div className={styles.header}>
            <h2 className={clsx("h3", styles.title)}>Описание товара</h2>
            <Link
              href="/help?type=delivery"
              className={clsx("h3", styles.title)}
            >
              Доставка и оплата
            </Link>
          </div>
          <div className={clsx("body-1", styles.text)}>
            Описание товара Описание товара Описание товара Описание товара
            Описание товара Описание товара Описание товара Описание товара
            Описание товара Описание товара Описание товара Описание товара
            Описание товара Описание товара Описание товара Описание товара
            Описание товара Описание товара
          </div>
        </div>
      </div>

      <PopularSlider title="С этим товаром также покупают" />
      <Feedback />
    </>
  );
};

export default page;
