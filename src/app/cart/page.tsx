"use client";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import globalStore from "@/stores/global-store";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import InlineButton from "@/components/Buttons/InlineButton/InlineButton";
import { useState, useEffect } from "react";
import wheelHD from "@/assets/images/wheel-hd.png";
import Image from "next/image";
import Link from "next/link";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { SvgEmpty } from "@/assets/icons/svgs";
import { formatPrice } from "@/utils/helper";
const Page = observer(() => {
  const { cartStore } = globalStore;
  const {
    cart,
    addToCart,
    removeAllFromCart,
    removeFromCart,
    removeOneFromCart,
    getTotalCount,
    getTotalPrice,
  } = cartStore;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Корзина", href: "/cart" },
          ]}
        />
        <div className={styles.info}>
          <h1 className={clsx(styles.title, "h1")}>
            Корзина
            <span className={clsx("body-4", styles.count)}>
              {getTotalCount()} товаров
            </span>
          </h1>
          {Object.values(cart).length > 0 && (
            <InlineButton onClick={removeAllFromCart} isIcon>
              Очистить корзину
            </InlineButton>
          )}
        </div>
        <div className={styles.container}>
          {Object.values(cart).length === 0 && (
            <div className={styles.empty}>
              <SvgEmpty />
              <div className={clsx("h2", styles.emptyTitle)}>
                В корзине ничего нет...
              </div>
              <div className={clsx("body-1", styles.description)}>
                Добавьте товары в корзину, чтобы здесь появились товары.
              </div>
              <MainButton type="link" href="/catalog">
                Перейти в каталог
              </MainButton>
            </div>
          )}
          {Object.values(cart).length > 0 && (
            <div className={styles.list}>
              {Object.values(cart).map(({ product, count }) => (
                <div key={product.id} className={styles.product}>
                  <Image src={wheelHD} alt="wheel-hd" />
                  <div className={styles.info}>
                    <div className={styles.title}>
                      <Link
                        href={`/catalog/${product.category.slug}/${product.slug}`}
                        className={clsx("h3")}
                      >
                        {product.name}
                      </Link>
                      <div className={styles.price}>
                        <div className={clsx("h4", styles.price)}>
                          {Number(product.discount) > 0 ? (
                            <>
                              {formatPrice(
                                Number(product.price) *
                                  (1 - Number(product.discount) / 100)
                              )}
                               BYN
                              <span className={clsx("body-3", styles.discount)}>
                                {formatPrice(Number(product.price))} BYN
                              </span>
                            </>
                          ) : (
                            <>{formatPrice(Number(product.price))} BYN</>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.controlsWrapper}>
                      <div className={styles.price}>
                        <div className={clsx("h4", styles.price)}>
                          {Number(product.discount) > 0 ? (
                            <>
                              {formatPrice(
                                Number(product.price) *
                                  (1 - Number(product.discount) / 100)
                              )}
                               BYN
                              <span className={clsx("body-3", styles.discount)}>
                                {formatPrice(Number(product.price))} BYN
                              </span>
                            </>
                          ) : (
                            <>{formatPrice(Number(product.price))} BYN</>
                          )}
                        </div>
                      </div>
                      <div className={styles.controls}>
                        <ArrowButton
                          className={clsx(styles.arrow, styles.arrowLeft)}
                          onClick={() => {
                            if (count > 1) {
                              removeOneFromCart(product);
                            }
                          }}
                          name="remove-one-from-cart"
                        />
                        <div className={clsx("h3", styles.count)}>{count}</div>
                        <ArrowButton
                          className={styles.arrow}
                          onClick={() => addToCart(product)}
                          name="add-one-to-cart"
                        />
                      </div>
                    </div>
                  </div>
                  <InlineButton
                    className={styles.remove}
                    onClick={() => removeFromCart(product)}
                  >
                    Удалить
                  </InlineButton>
                </div>
              ))}
            </div>
          )}

          {Object.values(cart).length > 0 && (
            <div className={styles.total}>
              <div className={styles.totalItem}>
                <div className={clsx("body-1", styles.totalTitle)}>
                  Стоимость товаров без скидки
                </div>
                <div className={clsx("h3", styles.totalPrice)}>
                  {getTotalPrice().discountedPrice} BYN
                </div>
              </div>
              <div className={clsx(styles.totalItem, styles.discount)}>
                <div className={clsx("body-1", styles.totalTitle)}>Скидка</div>
                <div className={clsx("h3", styles.totalPrice)}>
                  {getTotalPrice().fullPrice - getTotalPrice().discountedPrice}{" "}
                  BYN
                </div>
              </div>
              <div className={styles.summary}>
                <div className={clsx("h4", styles.totalTitle)}>Итого</div>
                <div className={clsx("h2", styles.totalPrice)}>
                  {getTotalPrice().discountedPrice} BYN
                </div>
              </div>
              <MainButton
                href="/cart/checkout"
                type="link"
                className={styles.checkout}
              >
                Перейти к оформлению
              </MainButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default Page;
