import { SeriesT, GenerationT, BodyT } from "@/types/types";

export const getSeries = async (): Promise<SeriesT[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/bmw/series`, {
      next: {
        revalidate: 60,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getGenerations = async (): Promise<GenerationT[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/bmw/generations`, {
      next: {
        revalidate: 60,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getGenerationsBySeriesSlug = async (slug: string): Promise<GenerationT[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/bmw/series/${slug}/generations`, {
      next: {
        revalidate: 60,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getBodies = async (): Promise<BodyT[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/bmw/bodies`, {
      next: {
        revalidate: 60,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBodiesByGenerationSlug = async (slug: string): Promise<BodyT[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/bmw/generations/${slug}/bodies`, {
      next: {
        revalidate: 60,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}



