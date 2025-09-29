import { ProductT } from "./types";

export type SeoTextT = {
  content: string;
  id: number;
  page: string;
};

export type FeedbackResponse = {
  success: boolean;
  message: string;
};

export type FeedbackT = {
  name: string;
  phone: string;
  comment: string;
  isAgree: boolean;
  subject?: string;
}


export type ProductParamsT = {
  sort?: string | null;
  generation?: string | null;
  series?: string | null;
  body?: string | null;
  year?: string | null;
  price?: string | null;
  transmission?: string | null;
  page?: number | null;
  search?: string | null;
  category?: string | null;
  categoryId?: number | null;
  // Индексная сигнатура для динамических фильтров спецификаций
  [key: string]: string | number | null | undefined;
}

export type ProductResponseT = {
  current_page: number;
  data: ProductT[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  max_price: number;
}


export type OrderT = {
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
  delivery_method_id: number;
  payment_method_id: number;
  items: {
    product_id: number;
    quantity: number;
  }[];
}

export type OrderResponseT = {
  success: boolean;
  data: {
    id: number;
    order_number: string;
    customer_name: string;
    total_amount: number;
    payment_form_url: string | null;
    payment_error: string | null;
  }
}