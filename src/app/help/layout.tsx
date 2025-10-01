import { getSeoPage } from "@/services/InfoService";

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("help");

  return {
    title: seo?.title ?? "Помощь покупателю",
    description: seo?.description ?? "Помощь покупателю",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.title ?? "Помощь покупателю",
      description: seo?.title ?? "Помощь покупателю",
    },
  };
};
const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
