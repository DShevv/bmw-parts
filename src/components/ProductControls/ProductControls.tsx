"use client";
import clsx from "clsx";
import styles from "./ProductControls.module.scss";
import MainButton from "../Buttons/MainButton/MainButton";
import { SvgHeart } from "@/assets/icons/svgs";
import { ProductT } from "@/types/types";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { formatPrice } from "@/utils/helper";
const ProductControls = observer(({ product }: { product: ProductT }) => {
  const { favoritesStore, popupStore, cartStore, notificationStore } =
    globalStore;
  const { isFavorite, toggleFavorite } = favoritesStore;
  const { openPopup } = popupStore;
  const { addToCart } = cartStore;
  const { setNotification } = notificationStore;

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
        <MainButton
          style={product.in_stock ? "primary" : "secondary"}
          className={styles.addToCart}
          onClick={() => {
            if (product.in_stock) {
              addToCart(product);
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
