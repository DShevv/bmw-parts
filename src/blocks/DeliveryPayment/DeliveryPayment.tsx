"use client";
import styles from "./DeliveryPayment.module.scss";
import clsx from "clsx";
import { SvgBank, SvgDelivery } from "@/assets/icons/svgs";
import { useState } from "react";
import { SettingT } from "@/types/types";

const DeliveryPayment = ({ settings }: { settings: SettingT }) => {
  const [type, setType] = useState<"payment" | "delivery">("payment");

  return (
    <section className={styles.section}>
      <h2 className={clsx(styles.title, "h2")}>Способы доставки и оплаты</h2>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <div
            className={clsx("body-1", styles.link, {
              [styles.active]: type === "payment",
            })}
            onClick={() => setType("payment")}
          >
            <SvgBank />
            Оплата
          </div>
          <div
            className={clsx("body-1", styles.link, {
              [styles.active]: type === "delivery",
            })}
            onClick={() => setType("delivery")}
          >
            <SvgDelivery />
            Доставка
          </div>
        </div>

        <div className={styles.container}>
          {type === "payment" && (
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{
                __html: settings.delivery_payment.payment_text,
              }}
            />
          )}
          {type === "delivery" && (
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{
                __html: settings.delivery_payment.delivery_text,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default DeliveryPayment;
