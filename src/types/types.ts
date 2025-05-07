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

export type NewsListT = {
  current_page: number;
  data: NewsT[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};

export type NewsT = {
  id: number;
  title: string;
  slug: string;
  content: string;
  subtitle: string;
  image: string;
  created_at: string;
  views: number;
};

export type SeoTagT = {
  id: number;
  name: string;
  title: string;
  description: string;
  keywords: string;
  og_title: string;
  og_description: string;
  created_at: string;
  updated_at: string;
};


export type SettingT = {
  favicon_path?: string;
  about_enabled: boolean;
  accent_color: string;
  address: string;
  advantages_enabled: boolean;
  bank_details: string;
  banners_enabled: boolean;
  button_secondary_color: string;
  company_info: string;
  contacts_enabled: boolean;
  delivery_payment_enabled: boolean;
  delivery_text: string | null;
  email: string;
  feedback_image_path: string;
  instagram: string | null;
  logo_path: string;
  payment_text: string | null;
  phones: string[];
  primary_color: string;
  privacy_policy_enabled: boolean;
  privacy_policy_text: string;
  secondary_color: string;
  telegram: string;
  viber: string;
  whatsapp: string;
  working_hours: string | null;
  footer_logo_path: string;
};

export type ContactsT = {
  address: string;
  bank_details: string;
  company_info: string;
  email: string;
  instagram: string;
  phones: string[];
  telegram: string;
  viber: string;
  whatsapp: string;
  working_hours: string;
};