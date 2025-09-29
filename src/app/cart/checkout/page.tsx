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
import Image from "next/image";
import Checkbox from "@/components/Inputs/Checkbox/Checkbox";
import { useRouter } from "next/navigation";
import { isActiveStepOne } from "@/utils/helper";
import { DeliveryT, PaymentT } from "@/types/types";
import { getDeliveries, getPayments } from "@/services/CatalogService";
import { postOrder } from "@/services/FeedbackService";
import { OrderT } from "@/types/api";
import validateOrderForm from "@/utils/validateOrderForm";

const Page = observer(() => {
  const { cartStore } = globalStore;
  const { removeAllFromCart, getTotalPrice, cart } = cartStore;
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [delivery, setDelivery] = useState<DeliveryT[]>([]);
  const [payment, setPayment] = useState<PaymentT[]>([]);

  useEffect(() => {
    setIsClient(true);

    const fetchPayments = async () => {
      const [deliveries, payments] = await Promise.all([
        getDeliveries(),
        getPayments(),
      ]);
      setDelivery(deliveries);
      setPayment(payments);
    };

    fetchPayments();
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
            delivery: delivery.length > 0 ? delivery[0].id.toString() : "",
            address: "",
            comment: "",
            payment: "",
            isAgree: false,
          }}
          validate={(values) => validateOrderForm(values, delivery)}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (values) => {
            const orderData: OrderT = {
              customer_name: `${values.name} ${values.lastName}`,
              phone: values.phone,
              email: values.email,
              address: values.address.length > 0 ? values.address : "Самовывоз",
              comment: values.comment,
              delivery_method_id: Number(values.delivery),
              payment_method_id: Number(values.payment),
              items: Object.values(cart).map((item) => ({
                product_id: item.product.id,
                quantity: item.count,
              })),
            };

            const paymentMethod = payment.find(
              (item) => item.id === Number(values.payment)
            );
            const isOnlinePayment =
              paymentMethod?.name.toLowerCase() === "оплата картой онлайн";
            const order = await postOrder(orderData);

            if (order.success) {
              if (isOnlinePayment && order.data.payment_error) {
                router.push(`/cart/checkout/order`);
                return;
              }
              removeAllFromCart();
              router.push(
                isOnlinePayment
                  ? order.data.payment_form_url ?? ""
                  : `/cart/checkout/order?orderId=${order.data.order_number}`
              );
            } else {
              router.push(`/cart/checkout/order`);
            }
          }}
        >
          {({ values, errors, setFieldValue }) => {
            return (
              <Form>
                <AnimatePresence mode="sync">
                  <div className={styles.container}>
                    <m.div layout className={styles.list}>
                      <m.div layout className={styles.step}>
                        <div className={styles.stepTitle}>
                          <span
                            className={clsx("h3", styles.stepNumber, {
                              [styles.active]: isActiveStepOne(
                                values.name,
                                values.lastName,
                                values.email,
                                values.phone
                              ),
                            })}
                          >
                            1
                          </span>
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
                            onChange={(value) =>
                              setFieldValue("lastName", value)
                            }
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
                          <span
                            className={clsx("h3", styles.stepNumber, {
                              [styles.active]: values.delivery !== "",
                            })}
                          >
                            2
                          </span>
                          <span className="h4">Выберите способ доставки</span>
                        </div>
                        <div className={styles.stepLine}>
                          {delivery.map((item) => (
                            <DeliveryType
                              key={item.id}
                              title={item.name}
                              description={item.description}
                              price={Number(item.cost)}
                              isSelected={
                                values.delivery === item.id.toString()
                              }
                              onClick={() =>
                                setFieldValue("delivery", item.id.toString())
                              }
                            />
                          ))}
                        </div>
                      </m.div>

                      <AnimatePresence mode="popLayout">
                        {values.delivery !== "" &&
                          values.delivery !== delivery[0].id.toString() && (
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
                                <span
                                  className={clsx("h3", styles.stepNumber, {
                                    [styles.active]: values.address.length > 0,
                                  })}
                                >
                                  3
                                </span>
                                <span className="h4">
                                  Укажите адрес доставки
                                </span>
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
                          <span
                            className={clsx("h3", styles.stepNumber, {
                              [styles.active]: values.payment.length > 0,
                            })}
                          >
                            {values.delivery !== "" &&
                            values.delivery !== delivery[0].id.toString()
                              ? "4"
                              : "3"}
                          </span>
                          <span className="h4">Выберите способ оплаты</span>
                        </div>
                        <div className={styles.stepLine}>
                          {payment.map((item) => (
                            <div
                              key={item.id}
                              className={clsx("body-1", styles.paymentType, {
                                [styles.active]:
                                  values.payment === item.id.toString(),
                              })}
                              onClick={() =>
                                setFieldValue("payment", item.id.toString())
                              }
                            >
                              <div className={styles.paymentTypeIcons}>
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_STORE_URL}/${item.image}`}
                                  alt={item.name}
                                  width={30}
                                  height={33}
                                />
                              </div>
                              {item.name}
                            </div>
                          ))}
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
                        <div className={clsx("h4", styles.totalTitle)}>
                          Итого
                        </div>
                        <div className={clsx("h2", styles.totalPrice)}>
                          {getTotalPrice().discountedPrice +
                            (Number(
                              delivery.find(
                                (item) => item.id === Number(values.delivery)
                              )?.cost
                            ) || 0)}
                           BYN
                        </div>
                      </div>
                      <Checkbox name="isAgree" className={styles.checkbox}>
                        Согласие на обработку персональных данных
                      </Checkbox>
                      <MainButton
                        disabled={
                          !values.isAgree ||
                          !isActiveStepOne(
                            values.name,
                            values.lastName,
                            values.email,
                            values.phone
                          ) ||
                          !(values.payment.length > 0) ||
                          !(values.delivery.length > 0)
                        }
                        type="submit"
                        className={styles.checkout}
                      >
                        Заказать
                      </MainButton>
                    </div>
                  </div>
                </AnimatePresence>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
});

export default Page;
