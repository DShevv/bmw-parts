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
import { getProducts } from "@/services/CatalogService";
import { getPromo } from "@/services/PromoService";

export default async function Home() {
  const news = await getNews({ page: 1, perPage: 9 });
  const products = await getProducts();
  const promo = await getPromo({ page: 1, perPage: 10 });

  console.log(promo);

  return (
    <>
      <Hero />
      <NewsModels news={news?.data ?? []} />
      <AboutBlock />
      <PopularSlider products={products ?? []} />
      <RecentPromo promo={promo?.data.data ?? []} />
      <DeliveryPayment />
      <ContactsBlock />
      <SeoBlock page="main" />
      <Feedback />
    </>
  );
}
