import { getSeoPage } from "@/services/InfoService";

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("favorites");

  return {
    title: seo?.title ?? "Избранное",
    description: seo?.description ?? "Избранное",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.title ?? "Избранное",
      description: seo?.title ?? "Избранное",
    },
  };
};
const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
