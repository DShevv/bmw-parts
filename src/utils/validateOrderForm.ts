import { OrderFormT, ValidateOrderFormT, DeliveryT } from "@/types/types";

export default function validateOrderForm(
  data: OrderFormT,
  deliveries: DeliveryT[]
): ValidateOrderFormT {
  const errors: ValidateOrderFormT = {};

  // Валидация имени
  if (!data.name) {
    errors.name = "Введите имя";
  } else if (data.name.length < 2) {
    errors.name = "Минимум 2 символа";
  }

  // Валидация фамилии
  if (!data.lastName) {
    errors.lastName = "Введите фамилию";
  } else if (data.lastName.length < 2) {
    errors.lastName = "Минимум 2 символа";
  }

  // Валидация телефона
  if (!data.phone) {
    errors.phone = "Введите номер телефона";
  } else if (data.phone.length !== 19) {
    errors.phone = "Некорректный номер телефона";
  }

  // Валидация email (если введен)
  if (data.email && data.email.length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = "Некорректный email";
    }
  }



  // Валидация адреса (если выбрана не первая доставка)
  if (data.delivery && deliveries.length > 0) {
    const firstDeliveryId = deliveries[0].id.toString();
    if (data.delivery !== firstDeliveryId && !data.address) {
      errors.address = "Введите адрес доставки";
    }
  }



  return errors;
} 