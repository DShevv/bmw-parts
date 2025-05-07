import { getSeoPage } from "@/services/InfoService";

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("help");

  return {
    title: seo?.title ?? "BMW parts",
    description: seo?.description ?? "BMW parts",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.title ?? "BMW parts",
      description: seo?.title ?? "BMW parts",
    },
  };
};
const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
