import { StaticImageData } from "next/image";
export type ProductT = {
  id: number;
  image: StaticImageData | string;
  title: string;
  type: string;
  brand: string;
  price: number;
  discount: number;
  isAvailable: "available" | "unavailable" | "order";
};

export type PromotionT = {
  id: number;
  image: StaticImageData | string;
  title: string;
  date: string;

};

export type FeedbackT = {
  name: string;
  phone: string;
  comment: string;
  isAgree: boolean;
};

export type ValidateFeedbackT = {
  name?: string;
  phone?: string;
};

