"use client";
import styles from "./page.module.scss";
import clsx from "clsx";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { useSearchParams } from "next/navigation";
import { SvgBoxes, SvgError } from "@/assets/icons/svgs";

const Page = () => {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <section className={styles.container}>
      {orderId ? (
        <>
          <SvgBoxes />
          <h1 className={clsx("h1", styles.title)}>Ваш заказ оформлен!</h1>
          <p className={clsx("h3", styles.description)}>
            Номер вашего заказа: <span>{orderId}</span>.
          </p>
          <p className={clsx("body-1", styles.description)}>
            Скоро наш специалист свяжется с вами и уточнит все детали заказа.
          </p>

          <MainButton className={styles.button} type="link" href="/">
            Вернуться на главную
          </MainButton>
        </>
      ) : (
        <>
          <SvgError />
          <h1 className={clsx("h1", styles.title)}>Ваш заказ не оформлен…</h1>
          <p className={clsx("body-1", styles.description)}>
            Пожалуйста, повторите попытку ещё раз.
          </p>
          <MainButton className={styles.button} type="link" href="/">
            Вернуться на главную
          </MainButton>
        </>
      )}
    </section>
  );
};

export default Page;
