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
  gearbox?: string | null;
  page?: number | null;
  search?: string | null;
  category?: string | null;
}

export type ProductResponseT = {
  current_page: number;
  data: ProductT[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}
