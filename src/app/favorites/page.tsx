"use client";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import globalStore from "@/stores/global-store";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import InlineButton from "@/components/Buttons/InlineButton/InlineButton";
import ProductItem from "@/components/ProductItem/ProductItem";
import { useState, useEffect } from "react";
import { SvgEmpty } from "@/assets/icons/svgs";
import MainButton from "@/components/Buttons/MainButton/MainButton";

const Page = observer(() => {
  const { favoritesStore } = globalStore;
  const { favorites, removeAllFavorites } = favoritesStore;
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
            { title: "Избранное", href: "/favorites" },
          ]}
        />
        <div className={styles.info}>
          <h1 className={clsx(styles.title, "h1")}>
            Избранное
            <span className={clsx("body-4", styles.count)}>
              {Object.keys(favorites).length} товаров
            </span>
          </h1>
          {Object.keys(favorites).length > 0 && (
            <InlineButton onClick={removeAllFavorites} isIcon>
              Очистить избранное
            </InlineButton>
          )}
        </div>
        <div className={styles.container}>
          {Object.values(favorites).length === 0 && (
            <div className={styles.empty}>
              <SvgEmpty />
              <div className={clsx("h2", styles.emptyTitle)}>
                В избранном ничего нет...
              </div>
              <div className={clsx("body-1", styles.description)}>
                Добавьте товары в избранное, чтобы здесь появились товары.
              </div>
              <MainButton type="link" href="/catalog">
                Перейти в каталог
              </MainButton>
            </div>
          )}
          {Object.values(favorites).map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
});

export default Page;
