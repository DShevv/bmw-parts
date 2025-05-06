"use client";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import globalStore from "@/stores/global-store";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { Form, Formik } from "formik";
import MainInput from "@/components/Inputs/MainInput/MainInput";
import DeliveryType from "@/components/DeliveryType/DeliveryType";
import CommentInput from "@/components/Inputs/CommentInput/CommentInput";
import { motion as m, AnimatePresence } from "motion/react";
import mastercard from "@/assets/images/payments/marstercard.png";
import visa from "@/assets/images/payments/visa.png";
import belcard from "@/assets/images/payments/belcard.png";
import Image from "next/image";
import { SvgBanknote, SvgCard } from "@/assets/icons/svgs";
import Checkbox from "@/components/Inputs/Checkbox/Checkbox";
import { useRouter } from "next/navigation";

const Page = observer(() => {
  const { cartStore } = globalStore;
  const { removeAllFromCart, getTotalPrice } = cartStore;
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

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
            { title: "Корзина", href: "/cart" },
            { title: "Оформление заказа", href: "/cart/checkout" },
          ]}
        />
        <div className={styles.info}>
          <h1 className={clsx(styles.title, "h1")}>Оформление заказа</h1>
        </div>
        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            phone: "",
            delivery: "pickup",
            address: "",
            comment: "",
            payment: "online",
            isAgree: false,
          }}
          onSubmit={(values) => {
            console.log(values);
            removeAllFromCart();
            router.push(`/cart/checkout/order?orderId=${12345}`);
          }}
        >
          {({ values, errors, setFieldValue }) => (
            <Form>
              <AnimatePresence mode="sync">
                <div className={styles.container}>
                  <m.div layout className={styles.list}>
                    <m.div layout className={styles.step}>
                      <div className={styles.stepTitle}>
                        <span className={clsx("h3", styles.stepNumber)}>1</span>
                        <span className="h4">
                          Укажите ваши контактные данные
                        </span>
                      </div>
                      <div className={styles.stepGrid}>
                        <MainInput
                          title="Имя"
                          name="name"
                          placeholder="Ваше имя"
                          className={styles.input}
                          type="text"
                          error={errors.name}
                          value={values.name}
                          onChange={(value) => setFieldValue("name", value)}
                        />
                        <MainInput
                          title="Фамилия"
                          name="lastName"
                          placeholder="Ваша фамилия"
                          className={styles.input}
                          type="text"
                          error={errors.lastName}
                          value={values.lastName}
                          onChange={(value) => setFieldValue("lastName", value)}
                        />
                        <MainInput
                          title="Номер телефона"
                          name="phone"
                          placeholder="+375 (__) ___-__-__"
                          mask="+375 (99) 999-99-99"
                          className={styles.input}
                          type="tel"
                          error={errors.phone}
                          value={values.phone}
                          onChange={(value) => setFieldValue("phone", value)}
                        />
                        <MainInput
                          title="Email"
                          name="email"
                          placeholder="Ваш email"
                          className={styles.input}
                          type="email"
                          error={errors.email}
                          value={values.email}
                          onChange={(value) => setFieldValue("email", value)}
                        />
                      </div>
                    </m.div>
                    <m.div layout className={styles.step}>
                      <div className={styles.stepTitle}>
                        <span className={clsx("h3", styles.stepNumber)}>2</span>
                        <span className="h4">Выберите способ доставки</span>
                      </div>
                      <div className={styles.stepLine}>
                        <DeliveryType
                          title="Самовывоз"
                          description="По адресу: г. Минск. ул. Ленина, 1 с 09:00 до 21:00 ежедневно"
                          price={0}
                          isSelected={values.delivery === "pickup"}
                          onClick={() => setFieldValue("delivery", "pickup")}
                        />
                        <DeliveryType
                          title="Обычная доставка (3 дня)"
                          description="В рабочее время работы интернет-магазина по указанному вами адресу"
                          price={20}
                          isSelected={values.delivery === "delivery"}
                          onClick={() => setFieldValue("delivery", "delivery")}
                        />
                        <DeliveryType
                          title="Экспресс-доставка (до 2 дней)"
                          description="В рабочее время работы интернет-магазина по указанному вами адресу"
                          price={40}
                          isSelected={values.delivery === "express"}
                          onClick={() => setFieldValue("delivery", "express")}
                        />
                      </div>
                    </m.div>

                    <AnimatePresence mode="popLayout">
                      {values.delivery !== "pickup" && (
                        <m.div
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -10,
                            transition: {
                              opacity: { duration: 0.3, ease: "easeOut" },
                              y: { duration: 0.3, ease: "easeOut" },
                            },
                          }}
                          transition={{
                            type: "spring",
                            duration: 0.3,
                            bounce: 0.1,
                            layout: { duration: 0.3 },
                          }}
                          className={styles.step}
                        >
                          <div className={styles.stepTitle}>
                            <span className={clsx("h3", styles.stepNumber)}>
                              3
                            </span>
                            <span className="h4">Укажите адрес доставки</span>
                          </div>
                          <div className={styles.stepBlock}>
                            <MainInput
                              className={styles.input}
                              title="Адрес доставки"
                              name="address"
                              placeholder="Введите адрес доставки"
                              type="text"
                              error={errors.address}
                              value={values.address}
                              onChange={(value) =>
                                setFieldValue("address", value)
                              }
                            />
                            <CommentInput
                              className={styles.input}
                              title="Комментарий к адресу"
                              name="comment"
                              placeholder="Введите комментарий к адресу"
                            />
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>

                    <m.div layout className={styles.step}>
                      <div className={styles.stepTitle}>
                        <span className={clsx("h3", styles.stepNumber)}>
                          {values.delivery !== "pickup" ? "4" : "3"}
                        </span>
                        <span className="h4">Выберите способ оплаты</span>
                      </div>
                      <div className={styles.stepLine}>
                        <div
                          className={clsx("body-1", styles.paymentType, {
                            [styles.active]: values.payment === "online",
                          })}
                          onClick={() => setFieldValue("payment", "online")}
                        >
                          <div className={styles.paymentTypeIcons}>
                            <Image
                              src={mastercard}
                              alt="mastercard"
                              width={45}
                              height={27}
                            />
                            <Image
                              src={visa}
                              alt="visa"
                              width={47}
                              height={14}
                            />
                            <Image
                              src={belcard}
                              alt="belcard"
                              width={30}
                              height={33}
                            />
                          </div>
                          Оплата картой онлайн
                        </div>
                        <div
                          className={clsx("body-1", styles.paymentType, {
                            [styles.active]: values.payment === "card",
                          })}
                          onClick={() => setFieldValue("payment", "card")}
                        >
                          <div className={styles.paymentTypeIcons}>
                            <SvgCard />
                          </div>
                          Оплата картой в пункте выдачи
                        </div>
                        <div
                          className={clsx("body-1", styles.paymentType, {
                            [styles.active]: values.payment === "cash",
                          })}
                          onClick={() => setFieldValue("payment", "cash")}
                        >
                          <div className={styles.paymentTypeIcons}>
                            <SvgBanknote />
                          </div>
                          Оплата наличными в пункте выдачи
                        </div>
                      </div>
                    </m.div>
                  </m.div>

                  <div className={styles.total}>
                    <div className={styles.totalItem}>
                      <div className={clsx("body-1", styles.totalTitle)}>
                        Стоимость товаров без скидки
                      </div>
                      <div className={clsx("h3", styles.totalPrice)}>
                        {getTotalPrice().discountedPrice} BYN
                      </div>
                    </div>
                    <div className={clsx(styles.totalItem, styles.discount)}>
                      <div className={clsx("body-1", styles.totalTitle)}>
                        Скидка
                      </div>
                      <div className={clsx("h3", styles.totalPrice)}>
                        {getTotalPrice().fullPrice -
                          getTotalPrice().discountedPrice}
                         BYN
                      </div>
                    </div>
                    <div className={styles.totalItem}>
                      <div className={clsx("body-1", styles.totalTitle)}>
                        Доставка
                      </div>
                      <div className={clsx("h3", styles.totalPrice)}>
                        {values.delivery === "pickup"
                          ? "Бесплатно"
                          : values.delivery === "delivery"
                          ? "20 BYN"
                          : "40 BYN"}
                      </div>
                    </div>
                    <div className={styles.summary}>
                      <div className={clsx("h4", styles.totalTitle)}>Итого</div>
                      <div className={clsx("h2", styles.totalPrice)}>
                        {getTotalPrice().discountedPrice +
                          (values.delivery === "pickup"
                            ? 0
                            : values.delivery === "delivery"
                            ? 20
                            : 40)}
                         BYN
                      </div>
                    </div>
                    <Checkbox name="isAgree" className={styles.checkbox}>
                      Согласие на обработку персональных данных
                    </Checkbox>
                    <MainButton
                      disabled={!values.isAgree}
                      type="submit"
                      className={styles.checkout}
                    >
                      Заказать
                    </MainButton>
                  </div>
                </div>
              </AnimatePresence>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
});

export default Page;
