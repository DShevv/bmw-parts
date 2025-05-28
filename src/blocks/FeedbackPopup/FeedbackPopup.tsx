"use client";
import clsx from "clsx";
import styles from "./FeedbackPopup.module.scss";
import Image from "next/image";
import feedbackPicture from "@/assets/images/popup.png";
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
import { postFeedback } from "@/services/FeedbackService";

const FeedbackPopup = observer(() => {
  const { popupStore, notificationStore } = globalStore;
  const { feedback, closePopup } = popupStore;
  const { setNotification } = notificationStore;

  useEffect(() => {
    if (feedback) {
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
  }, [feedback]);

  return (
    <div
      className={clsx(styles.wrapper, { [styles.active]: feedback })}
      onClick={() => closePopup("feedback")}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div onClick={() => closePopup("feedback")} className={styles.close}>
          <SvgClose />
        </div>
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
              closePopup("feedback");
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
        <Image
          src={feedbackPicture}
          alt="feedback"
          className={styles.image}
          width={624}
          height={624}
        />
      </div>
    </div>
  );
});

export default FeedbackPopup;
