import slugify from "slugify";

export function slugifyWithOpts(name: string) {
  return slugify(name, { lower: true, remove: /[^\w\s-]/g, locale: "ru" });
}
