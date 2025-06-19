import { CategoryT } from "@/types/types";
import slugify from "slugify";

export function slugifyWithOpts(name: string) {
  return slugify(name, { lower: true, remove: /[^\w\s-]/g, locale: "ru" });
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function isActiveStepOne(name: string, lastName: string, email: string, phone: string) {
  return name.length > 0 && lastName.length > 0 && email.length > 0 && phone.length > 0;
}

export function findCategoryBySlug(categories: CategoryT[], slug: string): CategoryT | undefined {
  for (const category of categories) {
    if (category.slug === slug) {
      return category;
    }

    if (category.subcategories?.length) {
      const found = findCategoryBySlug(category.subcategories, slug);
      if (found) {
        return found;
      }
    }
  }

  return undefined;
}
export function formatPrice(price: number) {
  return parseFloat(price.toFixed(2)).toString();
}
