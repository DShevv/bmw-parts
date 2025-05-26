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
  }
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
}

export type PromoT = {
  id: number;
  title: string;
  slug: string;
  content: string;
  photo_path: string;
  published_at: string;
}

export type NewsT = {
  id: number;
  title: string;
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
}

export type SettingT = {
  logo: string;
  favicon: string;
  feedback_image: string | null;
  footer_logo_path: string | null;
  about: AboutT;
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
  }
};

export type CategoryT = {
  id: number;
  name: string;
  slug: string;
  photo_path: string;
  parent_id: number | null;
  subcategories: CategoryT[] | undefined;
}

export type BrandT = {
  id: number;
  name: string;
  link: string | null;
  image_path: string | null;
  order: number;
}
