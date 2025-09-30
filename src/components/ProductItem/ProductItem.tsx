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
import { formatPrice } from "@/utils/helper";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton";

const ProductItem = observer(({ product }: { product: ProductT }) => {
  const {
    category,
    slug,
    in_stock,
    main_image,
    brand,
    sku,
    price,
    discount,
    name,
  } = product;

  const { cartStore, favoritesStore, notificationStore, popupStore } =
    globalStore;
  const { addToCart } = cartStore;
  const { isFavorite, toggleFavorite } = favoritesStore;
  const { setNotification } = notificationStore;
  const { openPopup } = popupStore;
  const [isClient, setIsClient] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link
      href={`/catalog/${category.slug}/${slug}`}
      className={clsx(styles.item, {
        [styles.order]: !in_stock,
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
        {in_stock && "В наличии"}
        {!in_stock && "Под заказ"}
        {/* product.isAvailable === "unavailable" && "Нет в наличии" */}
      </div>

      <Image
        src={`${process.env.NEXT_PUBLIC_STORE_URL}/${main_image?.image_path}`}
        alt={name}
        width={200}
        height={200}
        className={styles.image}
      />
      <div className={styles.container}>
        <div className={clsx(styles.title, "body-1")}>{name}</div>

        <div className={styles.info}>
          {/* <div className={clsx(styles.infoItem, "body-4")}>
            Тип/модель АКПП: <span className="body-3">{product.type}</span>
          </div> */}
          {brand && (
            <div className={clsx(styles.infoItem, "body-4")}>
              Производитель:{" "}
              <span className={clsx(styles.brand, "body-3")}>{brand.name}</span>
            </div>
          )}
          <div className={clsx(styles.infoItem, "body-4")}>
            Номер: <span className="body-3">{sku}</span>
          </div>
        </div>
        <div className={clsx(styles.price, "h3")}>
          {formatPrice(Number(price) * (1 - Number(discount) / 100))}
           BYN
          {Number(discount) > 0 && (
            <span className={clsx(styles.discount, "body-3")}>
              {formatPrice(Number(price))} BYN
            </span>
          )}
        </div>

        <div className={styles.controls}>
          <div
            className={styles.countControls}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <ArrowButton
              className={clsx(styles.arrow, styles.arrowLeft)}
              onClick={() => {
                if (count > 1) {
                  setCount(count - 1);
                }
              }}
              name="minus-one"
            />
            <div className={clsx("h3", styles.count)}>{count}</div>
            <ArrowButton
              className={styles.arrow}
              onClick={() => setCount(count + 1)}
              name="plus-one"
            />
          </div>
          <MainButton
            onClick={(e) => {
              e.preventDefault();
              if (in_stock) {
                addToCart(product, count);
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
            style={in_stock ? "primary" : "secondary"}
          >
            {in_stock ? "В корзину" : "Заказать"}
          </MainButton>
        </div>
      </div>
    </Link>
  );
});

export default ProductItem;
