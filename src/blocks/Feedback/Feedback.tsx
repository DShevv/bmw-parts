"use client";
import clsx from "clsx";
import styles from "./Feedback.module.scss";
import Image from "next/image";
import { Form, Formik } from "formik";
import MainInput from "@/components/Inputs/MainInput/MainInput";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Checkbox from "@/components/Inputs/Checkbox/Checkbox";
import CommentInput from "@/components/Inputs/CommentInput/CommentInput";
import validateFeedback from "@/utils/validateFeedback";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Autoplay } from "swiper/modules";
import { postFeedback } from "@/services/FeedbackService";
import { CategoryT } from "@/types/types";

const Feedback = observer(({ categories }: { categories: CategoryT[] }) => {
  const { notificationStore } = globalStore;
  const { setNotification } = notificationStore;

  return (
    <section className={styles.container}>
      <Formik
        initialValues={{ name: "", phone: "", comment: "", isAgree: false }}
        onSubmit={async (values, { resetForm }) => {
          const response = await postFeedback(values);
          if (response.success) {
            setNotification(
              "Спасибо за вашу заявку!",
              "Скоро с вами свяжется наш менеджер и ответит на все ваши вопросы",
              "success"
            );
            resetForm();
          } else {
            setNotification(
              "Не получили вашу заявку",
              "Пожалуйста, повторите попытку ещё раз.",
              "error"
            );
          }
        }}
        validate={validateFeedback}
        validateOnBlur={false}
        validateOnMount={false}
        validateOnChange={false}
      >
        {({ values, errors, setFieldValue }) => (
          <Form className={styles.form}>
            <h2 className={clsx("h2", styles.title)}>Остались вопросы?</h2>
            <p className={clsx("body-1", styles.description)}>
              Заполните форму обратной связи или свяжитесь с нами в удобном
              для вас мессенджере.
            </p>
            <MainInput
              placeholder="Имя"
              name="name"
              type="text"
              error={errors.name}
              value={values.name}
              onChange={(value) => setFieldValue("name", value)}
            />
            <MainInput
              placeholder="Телефон"
              name="phone"
              type="tel"
              mask="+375 (99) 999-99-99"
              error={errors.phone}
              value={values.phone}
              onChange={(value) => setFieldValue("phone", value)}
            />
            <CommentInput
              placeholder="Комментарий"
              name="comment"
              error={errors.comment}
              value={values.comment}
              onChange={(value) => setFieldValue("comment", value)}
            />
            <Checkbox name="isAgree">
              Согласна(-ен) на обработку персональных данных
            </Checkbox>
            <MainButton
              type="submit"
              disabled={!values.isAgree}
              className={styles.button}
            >
              Отправить
            </MainButton>
          </Form>
        )}
      </Formik>
      <div className={styles.imageContainer}>
        <Swiper
          initialSlide={1}
          breakpoints={{
            768: {
              initialSlide: Math.floor(categories.length / 2) - 1,
            },
          }}
          slidesPerView={"auto"}
          freeMode
          modules={[FreeMode, Autoplay]}
          className={styles.swiper}
          direction="vertical"
          speed={3000}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {categories.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <Link
                className={clsx(styles.item, "h4")}
                href={`/catalog/${item.slug}`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORE_URL}/${item.photo_path}`}
                  alt={item.name}
                  width={274}
                  height={200}
                />
                <span>{item.name}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          slidesPerView={"auto"}
          freeMode
          modules={[FreeMode, Autoplay]}
          className={clsx(styles.swiper, styles.secondary)}
          direction="vertical"
          speed={3500}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
        >
          {categories.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <Link
                className={clsx(styles.item, "h4")}
                href={`/catalog/${item.slug}`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORE_URL}/${item.photo_path}`}
                  alt={item.name}
                  width={274}
                  height={200}
                />
                <span>{item.name}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
});

export default Feedback;
