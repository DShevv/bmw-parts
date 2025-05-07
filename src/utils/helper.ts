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
