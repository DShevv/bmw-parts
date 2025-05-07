import { SeoTextT } from "@/types/api";
import { ContactsT, SettingT } from "@/types/types";

export const getContacts = async (): Promise<ContactsT | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/design/contacts`,
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

export const getSetting = async (): Promise<SettingT | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/design/settings`,
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

export async function getSeoText(page: string): Promise<SeoTextT | null> {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/seo/text?page=${page}`,
      {
        next: {
          revalidate: 60
        }
      }
    );

    if (!data.ok) {
      return null;
    }

    const res = await data.json();

    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getSeoPage(page: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/seo/tag?name=${page}`, {
      next: { revalidate: 60 },
    });
    const seo = await res.json();

    return { seo };
  } catch (error) {
    console.log(error);
    return { seo: undefined };
  }
}
