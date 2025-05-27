"use client";
import clsx from "clsx";
import styles from "./OrderPricePopup.module.scss";
import Image from "next/image";
import { Form, Formik } from "formik";
import MainInput from "@/components/Inputs/MainInput/MainInput";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Checkbox from "@/components/Inputs/Checkbox/Checkbox";
import CommentInput from "@/components/Inputs/CommentInput/CommentInput";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { useEffect } from "react";
import { SvgClose } from "@/assets/icons/svgs";
import validateFeedback from "@/utils/validateFeedback";

const OrderPricePopup = observer(() => {
  const { popupStore, notificationStore } = globalStore;
  const { order, orderProduct, closePopup } = popupStore;
  const { setNotification } = notificationStore;

  useEffect(() => {
    if (order) {
      const scrollPosition = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.overflowY = "scroll";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.overflowY = "auto";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollPosition);
      };
    }
  }, [order]);

  return (
    <div
      className={clsx(styles.wrapper, { [styles.active]: order })}
      onClick={() => closePopup("order")}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div onClick={() => closePopup("order")} className={styles.close}>
          <SvgClose />
        </div>

        <h2 className={clsx("h2", styles.title)}>Запросить цену</h2>
        <p className={clsx("body-1", styles.description)}>
          Заполните форму обратной связи, и мы вам перезвоним вам и уточним цену
          на этот товар под заказ.
        </p>

        <div className={styles.content}>
          <div className={styles.product}>
            {orderProduct && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STORE_URL}/${orderProduct?.product.main_image.image_path}`}
                alt={orderProduct?.product.name}
                width={100}
                height={100}
              />
            )}
            <div className={clsx("h3", styles.title)}>
              {orderProduct?.product.name}
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
});

export default OrderPricePopup;
