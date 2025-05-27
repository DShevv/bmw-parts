import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import PopularSlider from "@/blocks/PopularSlider/PopularSlider";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import ProductGallery from "@/blocks/ProductGallery/ProductGallery";
import clsx from "clsx";
import ProductControls from "@/components/ProductControls/ProductControls";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/services/CatalogService";
import { getCategories } from "@/services/CatalogService";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const products = await getProducts({});
  const categories = await getCategories();
  if (!product) {
    notFound();
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Каталог", href: "/catalog" },
            {
              title: product.category.name,
              href: `/catalog/${product.category.slug}`,
            },
            {
              title: product.name ?? "",
              href: `/catalog/${product.category.slug}/${product.slug}`,
            },
          ]}
        />
        <div className={styles.content}>
          <h1 className={clsx("h1", styles.title)}>{product.name}</h1>
          <div
            className={clsx("body-1", styles.isAvailable, {
              [styles.inStock]: product.in_stock,
            })}
          >
            {product.in_stock ? "В наличии" : "Под заказ"}
          </div>

          <ProductGallery
            images={product.images.map((image) => image.image_path)}
          />
          <div className={styles.info}>
            <h1 className={clsx("h1", styles.title)}>{product.name}</h1>
            <div
              className={clsx("body-1", styles.isAvailable, {
                [styles.inStock]: product.in_stock,
              })}
            >
              {product.in_stock ? "В наличии" : "Под заказ"}
            </div>
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
                <div className={clsx("h3", styles.specValue)}>
                  {product.brand.name}
                </div>
              </div>
              <div className={styles.spec}>
                <div className={clsx("body-2", styles.specKey)}>Номер</div>
                <div className={clsx("h3", styles.specValue)}>
                  {product.sku}
                </div>
              </div>
            </div>
            <ProductControls product={product} />
          </div>
        </div>

        <div className={styles.description}>
          <div className={styles.header}>
            <h2 className={clsx("h3", styles.title)}>Описание товара</h2>
            <Link
              href="/help?type=delivery"
              className={clsx("h3", styles.title)}
            >
              Доставка и оплата
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

      {products && (
        <PopularSlider
          title="С этим товаром также покупают"
          products={products.data ?? []}
        />
      )}
      <Feedback categories={categories ?? []} />
    </>
  );
};

export default page;
