import React from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import clsx from "clsx";

export const ProductCatalog = () => {
  return (
    <div className={s.container}>
      <div className={s.firstBlock}>
        <h2 className={clsx(s.title, "h2")}>Каталог продукции</h2>

        <p className={"body-2"}>
          Основной упор нашего магазина — оригинальные и сертифицированные
          детали для BMW, гарантирующие идеальную совместимость и надёжность.
          В ассортименте представлены:
        </p>
        <ul className={clsx(s.list, "body-2")}>
          <li>Детали двигателя и ГРМ;</li>
          <li>Тормозная система;</li>
          <li>Подвеска и рулевое управление;</li>
          <li>Трансмиссия и сцепление;</li>
          <li>Электрооборудование;</li>
          <li>Система охлаждения;</li>
          <li>Фильтры и расходники;</li>
          <li>Кузовные элементы.</li>
        </ul>
        <p className={"body-2"}>
          Мы также предлагаем редкие позиции для классических моделей BMW
          и тюнинговые решения. Каждая деталь сопровождается сертификатами,
          а сложные узлы (например, цепи ГРМ или турбокомпрессоры) проходят
          предпродажную проверку.
        </p>
      </div>
      <div className={s.secondBlock}>
        <Image src={"/car.png"} fill alt="product-catalog-image" />
      </div>
    </div>
  );
};
