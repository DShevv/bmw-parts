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
  const { cartStore, favoritesStore } = globalStore;
  const { addToCart } = cartStore;
  const { isFavorite, toggleFavorite } = favoritesStore;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link
      href="/catalog/category/product_1 "
      className={clsx(styles.item, {
        [styles.order]: product.isAvailable === "order",
        [styles.unavailable]: product.isAvailable === "unavailable",
      })}
    >
      {isClient && (
        <div
          className={clsx(styles.favorite, {
            [styles.favoriteActive]: isFavorite(product),
          })}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product);
          }}
        >
          <SvgHeart />
        </div>
      )}

      <div className={clsx(styles.available, "body-4")}>
        {product.isAvailable === "available" && "В наличии"}
        {product.isAvailable === "order" && "Под заказ"}
        {product.isAvailable === "unavailable" && "Нет в наличии"}
      </div>

      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className={styles.image}
      />
      <div className={styles.container}>
        <div className={clsx(styles.title, "body-1")}>{product.title}</div>

        <div className={styles.info}>
          <div className={clsx(styles.infoItem, "body-4")}>
            Тип/модель АКПП: <span className="body-3">{product.type}</span>
          </div>
          <div className={clsx(styles.infoItem, "body-4")}>
            Производитель: <span className="body-3">{product.brand}</span>
          </div>
          <div className={clsx(styles.infoItem, "body-4")}>
            Номер: <span className="body-3">{product.id}</span>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={clsx(styles.price, "h3")}>
            {product.price * (1 - product.discount / 100)} BYN
            {product.discount > 0 && (
              <span className={clsx(styles.discount, "body-3")}>
                {product.price} BYN
              </span>
            )}
          </div>
          <MainButton
            onClick={() => addToCart(product)}
            className={styles.button}
            style={
              product.isAvailable === "available" ? "primary" : "secondary"
            }
          >
            {product.isAvailable === "available" ? "В корзину" : "Заказать"}
          </MainButton>
        </div>
      </div>
    </Link>
  );
});

export default ProductItem;
