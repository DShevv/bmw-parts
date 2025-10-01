import { getSeoPage } from "@/services/InfoService";

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("find-parts");

  return {
    title: seo?.title ?? "Подбор запчастей для BMW",
    description: seo?.description ?? "Подбор запчастей для BMW",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.title ?? "Подбор запчастей для BMW",
      description: seo?.title ?? "Подбор запчастей для BMW",
    },
  };
};
const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
