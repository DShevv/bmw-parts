import styles from "./not-found.module.scss";
import numbers from "../assets/images/404.svg";
import Image from "next/image";
import clsx from "clsx";
import MainButton from "@/components/Buttons/MainButton/MainButton";

export default function NotFound() {
  return (
    <section className={styles.container}>
      <Image src={numbers} alt="404" />
      <h1 className={clsx("h1", styles.title)}>Что‑то пошло не так…</h1>
      <p className={clsx("body-2", styles.description)}>
        К сожалению, страница не найдена. Возможно, она была удалена
        или вы ввели некорректный адрес (ошибка 404).
      </p>
      <MainButton type="link" href="/" className={styles.button}>
        На главную
      </MainButton>
    </section>
  );
}
