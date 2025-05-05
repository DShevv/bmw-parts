"use client";
import clsx from "clsx";
import styles from "./ProductControls.module.scss";
import MainButton from "../Buttons/MainButton/MainButton";
import { SvgHeart } from "@/assets/icons/svgs";
import { ProductT } from "@/types/types";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";

const ProductControls = observer(({ product }: { product: ProductT }) => {
  const { favoritesStore } = globalStore;
  const { isFavorite, toggleFavorite } = favoritesStore;

  return (
    <div className={styles.container}>
      <div className={styles.priceContainer}>
        {product.discount === 0 ? (
          <div
            className={clsx("h2", styles.price, {
              [styles.isAvailable]: product.isAvailable === "available",
            })}
          >
            {product.price} BYN
          </div>
        ) : (
          <div
            className={clsx(styles.price, {
              [styles.isAvailable]: product.isAvailable === "available",
            })}
          >
            <div
              className={clsx("h2", styles.price, styles.discounted, {
                [styles.isAvailable]: product.isAvailable === "available",
              })}
            >
              {product.price * (1 - product.discount / 100)} BYN
            </div>
            <div className={clsx("h4", styles.discount)}>
              {product.price} BYN
            </div>
          </div>
        )}
      </div>
      <div className={styles.controls}>
        <MainButton
          style={product.isAvailable === "available" ? "primary" : "secondary"}
          className={styles.addToCart}
        >
          {product.isAvailable === "available"
            ? "Добавить в корзину"
            : "Запросить цену"}
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
