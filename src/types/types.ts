export type ProductT = {
  id: number;
  name: string;
  slug: string;
  description: string;
  photo_path: string;
  price: string;
  discount: string;
  is_popular: boolean;
  is_novelty: boolean;
  in_stock: boolean;
  sku: string;
  specifications: string[];
  is_active: boolean;
  category_id: number;
  manufacturer_id: number | null;
  order: number;
  brand_id: number;
  bmw_model_id: number | null;
  category: CategoryT;
  images: {
    image_path: string;
  }[];
  brand: BrandT;
  main_image: {
    image_path: string;
  };
};

export type FilterT = {
  specifications: {
    id: number;
    name: string;
    filter_type: "checkbox" | "range" | "dropdown";
    values: {
      value: string;
      count: number;
    }[];
  }[];
  price_range: {
    min: string;
    max: string;
  };
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

export type PromoListT = {
  success: boolean;
  data: {
    current_page: number;
    data: PromoT[];
    from: number;
    last_page: number;
  };
};

export type PromoT = {
  id: number;
  title: string;
  slug: string;
  content: string;
  photo_path: string;
  published_at: string;
};

export type NewsT = {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  content: string;
  photo_path: string;
  publication_date: string;
  tags: string[];
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

export type AboutT = {
  text: string;
  image: string;
};

export type SettingT = {
  logo_path: string;
  logo: string;
  favicon: string;
  favicon_path: string;
  feedback_image: string | null;
  footer_logo_path: string | null;
  about: AboutT;
  delivery_payment: {
    delivery_text: string;
    payment_text: string;
    warranty_text: string;
  };
  privacy_policy: {
    text: string;
  };
};

export type BannerT = {
  button_link: string;
  button_text: string;
  created_at: string;
  id: number;
  is_active: boolean;
  order: number;
  photo_path: string;
  subtitle: string | null;
  title: string;
};

export type ContactsT = {
  address: string;
  bank_details: string;
  company_info: string;
  email: string;
  phones: string[];
  working_hours: string;
  social_links: {
    instagram: string;
    telegram: string;
    viber: string;
    whatsapp: string;
  };
};

export type CategoryT = {
  id: number;
  name: string;
  slug: string;
  photo_path: string;
  parent_id: number | null;
  subcategories: CategoryT[] | undefined;
  products_count: number;
  icon_path: string | null;
};

export type BrandT = {
  id: number;
  name: string;
  link: string | null;
  image_path: string | null;
  order: number;
};

export type SeriesT = {
  id: number;
  image_path: string;
  is_active: boolean;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  updated_at: string;
};

export type GenerationT = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  image_path: string | null;
  created_at: string;
  production_year_end: number | null;
  production_year_start: number | null;
  series_id: number;
  is_active: boolean;
};

export type BodyT = {
  body_type: string;
  created_at: string;
  description: string;
  drivetrain: string;
  engine: string | null;
  generation_id: number;
  id: number;
  image_path: string | null;
  in_stock: boolean;
  is_active: boolean;
  name: string;
  slug: string;
  sort_order: number;
  specifications: {
    [key: string]: string;
  };
  transmission: string;
};

export type PaymentT = {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
};

export type DeliveryT = {
  id: number;
  name: string;
  description: string;
  cost: string;
};

export type OrderFormT = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  delivery: string;
  address: string;
  comment: string;
  payment: string;
  isAgree: boolean;
};

export type ValidateOrderFormT = {
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  delivery?: string;
  address?: string;
  payment?: string;
  isAgree?: string;
};
