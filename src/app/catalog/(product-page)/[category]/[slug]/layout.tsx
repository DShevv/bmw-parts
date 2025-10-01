import { getSeoPage } from "@/services/InfoService";
import { getProductBySlug } from "@/services/CatalogService";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { seo } = await getSeoPage(`${slug}`);
  const product = await getProductBySlug(slug);

  return {
    title: seo?.title ?? product?.name ?? "Товар",
    description: seo?.description ?? product?.name ?? "Товар",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.title ?? product?.name ?? "Товар",
      description: seo?.description ?? product?.name ?? "Товар",
    },
  };
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
