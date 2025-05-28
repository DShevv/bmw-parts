import AboutBlock from "@/blocks/AboutBlock/AboutBlock";
import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import DeliveryPayment from "@/blocks/DeliveryPayment/DeliveryPayment";
import Feedback from "@/blocks/Feedback/Feedback";
import Hero from "@/blocks/Hero/Hero";
import NewsModels from "@/blocks/NewsModels/NewsModels";
import PopularSlider from "@/blocks/PopularSlider/PopularSlider";
import RecentPromo from "@/blocks/RecentPromo/RecentPromo";
import SeoBlock from "@/blocks/SeoBlock/SeoBlock";
import { getNews } from "@/services/NewsService";
import { getPromo } from "@/services/PromoService";
import { getCategories, getProducts } from "@/services/CatalogService";
import { getBanners, getSetting } from "@/services/InfoService";

export default async function Home() {
  const news = await getNews({ page: 1, perPage: 9 });
  const products = await getProducts({});
  const promo = await getPromo({ page: 1, perPage: 10 });
  const categories = await getCategories();
  const banners = await getBanners();
  const settings = await getSetting();

  return (
    <>
      <Hero banners={banners ?? []} />
      <NewsModels news={news?.data ?? []} />
      <AboutBlock />
      {products && <PopularSlider products={products.data} />}
      <RecentPromo promo={promo?.data.data ?? []} />
      {settings && <DeliveryPayment settings={settings} />}
      <ContactsBlock />
      <SeoBlock page="main" />
      <Feedback categories={categories ?? []} />
    </>
  );
}
