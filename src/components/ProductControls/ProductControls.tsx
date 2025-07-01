"use client";
import clsx from "clsx";
import styles from "./ProductControls.module.scss";
import MainButton from "../Buttons/MainButton/MainButton";
import { SvgHeart } from "@/assets/icons/svgs";
import { ProductT } from "@/types/types";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { formatPrice } from "@/utils/helper";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton";
import { useState } from "react";
const ProductControls = observer(({ product }: { product: ProductT }) => {
  const { favoritesStore, popupStore, cartStore, notificationStore } =
    globalStore;
  const { isFavorite, toggleFavorite } = favoritesStore;
  const { openPopup } = popupStore;
  const { addToCart } = cartStore;
  const { setNotification } = notificationStore;
  const [count, setCount] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.priceContainer}>
        {Number(product.discount) === 0 ? (
          <div
            className={clsx("h2", styles.price, {
              [styles.isAvailable]: product.in_stock,
            })}
          >
            {product.in_stock && "от "}
            {formatPrice(Number(product.price))} BYN
          </div>
        ) : (
          <div
            className={clsx(styles.price, {
              [styles.isAvailable]: product.in_stock,
            })}
          >
            <div
              className={clsx("h2", styles.price, styles.discounted, {
                [styles.isAvailable]: product.in_stock,
              })}
            >
              {formatPrice(
                Number(product.price) * (1 - Number(product.discount) / 100)
              )}
               BYN
            </div>
            <div className={clsx("h4", styles.discount)}>
              {formatPrice(Number(product.price))} BYN
            </div>
          </div>
        )}
      </div>
      <div className={styles.controls}>
        <div className={styles.countControls}>
          <ArrowButton
            className={clsx(styles.arrow, styles.arrowLeft)}
            onClick={() => {
              if (count > 1) {
                setCount(count - 1);
              }
            }}
            name="remove-one-from-cart"
          />
          <div className={clsx("h3", styles.count)}>{count}</div>
          <ArrowButton
            className={styles.arrow}
            onClick={() => setCount(count + 1)}
            name="add-one-to-cart"
          />
        </div>
        <MainButton
          style={product.in_stock ? "primary" : "secondary"}
          className={styles.addToCart}
          onClick={() => {
            if (product.in_stock) {
              addToCart(product, count);
              setNotification("Товар добавлен в корзину", undefined, "success");
            } else {
              openPopup("order", { product, count: 1 });
            }
          }}
        >
          {product.in_stock ? "Добавить в корзину" : "Запросить цену"}
        </MainButton>
        <button
          className={clsx(styles.favorite, {
            [styles.active]: isFavorite(product),
          })}
          onClick={() => toggleFavorite(product)}
        >
          <SvgHeart />
        </button>
      </div>
    </div>
  );
});

export default ProductControls;
