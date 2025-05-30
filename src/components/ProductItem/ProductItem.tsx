"use client";
import styles from "./ProductItem.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ProductT } from "@/types/types";
import clsx from "clsx";
import MainButton from "../Buttons/MainButton/MainButton";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { SvgHeart } from "@/assets/icons/svgs";
import { useState, useEffect } from "react";

const ProductItem = observer(({ product }: { product: ProductT }) => {
  const { cartStore, favoritesStore, notificationStore, popupStore } =
    globalStore;
  const { addToCart } = cartStore;
  const { isFavorite, toggleFavorite } = favoritesStore;
  const { setNotification } = notificationStore;
  const { openPopup } = popupStore;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link
      href={`/catalog/${product.category.slug}/${product.slug}`}
      className={clsx(styles.item, {
        [styles.order]: !product.in_stock,
        // [styles.unavailable]: product.isAvailable === "unavailable",
      })}
    >
      {isClient && (
        <div
          className={clsx(styles.favorite, {
            [styles.favoriteActive]: isFavorite(product),
          })}
          onClick={(e) => {
            e.preventDefault();
            setNotification(
              isFavorite(product)
                ? "Товар удален из избранного"
                : "Товар добавлен в избранное",
              undefined,
              "success"
            );
            toggleFavorite(product);
          }}
        >
          <SvgHeart />
        </div>
      )}

      <div className={clsx(styles.available, "body-4")}>
        {product.in_stock && "В наличии"}
        {!product.in_stock && "Под заказ"}
        {/* product.isAvailable === "unavailable" && "Нет в наличии" */}
      </div>

      <Image
        src={`${process.env.NEXT_PUBLIC_STORE_URL}/${product.main_image.image_path}`}
        alt={product.name}
        width={200}
        height={200}
        className={styles.image}
      />
      <div className={styles.container}>
        <div className={clsx(styles.title, "body-1")}>{product.name}</div>

        <div className={styles.info}>
          {/* <div className={clsx(styles.infoItem, "body-4")}>
            Тип/модель АКПП: <span className="body-3">{product.type}</span>
          </div> */}
          <div className={clsx(styles.infoItem, "body-4")}>
            Производитель:{" "}
            <span className={clsx(styles.brand, "body-3")}>
              {product.brand.name}
            </span>
          </div>
          <div className={clsx(styles.infoItem, "body-4")}>
            Номер: <span className="body-3">{product.sku}</span>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={clsx(styles.price, "h3")}>
            {Number(product.price) * (1 - Number(product.discount) / 100)} BYN
            {Number(product.discount) > 0 && (
              <span className={clsx(styles.discount, "body-3")}>
                {product.price} BYN
              </span>
            )}
          </div>
          <MainButton
            onClick={(e) => {
              e.preventDefault();
              if (product.in_stock) {
                addToCart(product);
                setNotification(
                  "Товар добавлен в корзину",
                  undefined,
                  "success"
                );
              } else {
                openPopup("order", { product, count: 1 });
              }
            }}
            className={styles.button}
            style={product.in_stock ? "primary" : "secondary"}
          >
            {product.in_stock ? "В корзину" : "Заказать"}
          </MainButton>
        </div>
      </div>
    </Link>
  );
});

export default ProductItem;
