import { CategoryT, ProductT } from "@/types/types";

export const getCategories = async (): Promise<CategoryT[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/categories`,
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

export const getProducts = async (): Promise<ProductT[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/products`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const { data } = await res.json();



    return data.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
