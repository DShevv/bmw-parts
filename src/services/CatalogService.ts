import { ProductParamsT, ProductResponseT } from "@/types/api";
import { CategoryT, ProductT } from "@/types/types";

export const getCategories = async (): Promise<CategoryT[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/categories?with_products_count=true`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const { data } = await res.json();



    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getCategoriesBySlug = async (slug: string): Promise<CategoryT | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/categories/slug/${slug}?with_products_count=true`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const { data } = await res.json();

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};



export const getProductBySlug = async (slug: string): Promise<ProductT | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/products/${slug}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const { data } = await res.json();



    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getProducts = async ({
  sort,
  generation,
  series,
  body,
  year,
  price,
  gearbox,
  page,
  search,
  category,
}: ProductParamsT): Promise<ProductResponseT | null> => {
  try {
    const params = new URLSearchParams();

    if (sort && sort !== null) {
      if (sort[0] === "-") {
        params.set("sort_by", sort.slice(1));
        params.set("sort_direction", "desc");
      } else {
        params.set("sort_by", sort);
        params.set("sort_direction", "asc");
      }
    }

    if (page) {
      params.set("page", page.toString());
    }

    if (search) {
      params.set("search", search);
    }

    if (category) {
      params.set("category_id", category);
    }

    if (generation) {
      params.set("generation", generation);
    }

    if (series) {
      params.set("series", series);
    }

    if (body) {
      params.set("body", body);
    }

    if (year) {
      params.set("year", year);
    }

    if (price) {
      params.set("price_from", price.split("-")[0]);
      params.set("price_to", price.split("-")[1]);
    }

    if (gearbox) {
      params.set("gearbox", gearbox);
    }

    if (page) {
      params.set("page", page.toString());
    }




    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/products?${params.toString()}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const data = await res.json();



    return data.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
