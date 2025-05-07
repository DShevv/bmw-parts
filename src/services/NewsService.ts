import { NewsListT, NewsT } from "@/types/types";

export const getNews = async ({
  page,
  perPage,
}: {
  page?: number;
  perPage?: number;
}): Promise<NewsListT | null> => {
  try {
    const params = new URLSearchParams();

    if (page) params.append("page", page.toString());
    if (perPage) params.append("per_page", perPage.toString());

    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/news?${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 60,
      },
    });

    const { data } = await res.json();

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getNewsBySlug = async (slug: string): Promise<NewsT | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/news/${slug}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
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


export const addNewsView = async (id: number) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/news/${id}/increment-views`,
      {
        method: "POST",
      }
    );

  } catch (e) {
    console.log(e);
    return null;
  }
};
