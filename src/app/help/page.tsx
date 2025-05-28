"use client";
import { SvgBank, SvgDelivery, SvgDocuments } from "@/assets/icons/svgs";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSetting } from "@/services/InfoService";
import { useEffect, useState } from "react";
import { SettingT } from "@/types/types";

const Page = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [data, setData] = useState<SettingT | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const setting = await getSetting();
      setData(setting);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Помощь покупателю", href: "/help" },
          ]}
        />
        <h1 className={clsx(styles.title, "h1")}>Помощь покупателю</h1>
        <section className={styles.wrapper}>
          <div className={styles.sidebar}>
            <Link
              href="/help"
              className={clsx("body-1", styles.link, {
                [styles.active]: !type,
              })}
            >
              <SvgBank />
              Оплата
            </Link>
            <Link
              href="/help?type=delivery"
              className={clsx("body-1", styles.link, {
                [styles.active]: type === "delivery",
              })}
            >
              <SvgDelivery />
              Доставка
            </Link>
            <Link
              href="/help?type=policy"
              className={clsx("body-1", styles.link, {
                [styles.active]: type === "policy",
              })}
            >
              <SvgDocuments />
              Политика обработки персональных данных
            </Link>
          </div>

          <div className={styles.container}>
            {!type && (
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{
                  __html: data?.delivery_payment.payment_text ?? "",
                }}
              />
            )}
            {type === "delivery" && (
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{
                  __html: data?.delivery_payment.delivery_text ?? "",
                }}
              />
            )}
            {type === "policy" && (
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{
                  __html: data?.privacy_policy.text ?? "",
                }}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
