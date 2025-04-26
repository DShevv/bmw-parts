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
import { feedbackData } from "@/data/dumpy-data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

const Feedback = observer(() => {
  const { notificationStore } = globalStore;
  const { setNotification } = notificationStore;

  return (
    <section className={styles.container}>
      <Formik
        initialValues={{ name: "", phone: "", comment: "", isAgree: false }}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);

          setNotification(
            "Спасибо за вашу заявку!",
            "Скоро с вами свяжется наш менеджер и ответит на все ваши вопросы",
            "success"
          );
          resetForm();
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
              initialSlide: Math.floor(feedbackData.length / 2) - 1,
            },
          }}
          slidesPerView={"auto"}
          freeMode
          modules={[FreeMode]}
          className={styles.swiper}
          direction="vertical"
        >
          {feedbackData.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <Link className={clsx(styles.item, "h4")} href="/">
                <Image src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          slidesPerView={"auto"}
          freeMode
          modules={[FreeMode]}
          className={clsx(styles.swiper, styles.secondary)}
          direction="vertical"
        >
          {feedbackData.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <Link className={clsx(styles.item, "h4")} href="/">
                <Image src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
});

export default Feedback;
