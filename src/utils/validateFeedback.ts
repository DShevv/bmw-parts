import { FeedbackT, ValidateFeedbackT } from "@/types/types";

export default function validateFeedback(data: FeedbackT): ValidateFeedbackT {
  const errors: ValidateFeedbackT = {};

  if (!data.name) {
    errors.name = "Введите имя";
  } else if (data.name.length < 2) {
    errors.name = "Имя должно быть не менее 2 символов";
  }

  if (!data.phone) {
    errors.phone = "Введите номер телефона";
  } else if (data.phone.length !== 19) {
    errors.phone = "Введите корректный номер телефона";
  }


  return errors;
}

