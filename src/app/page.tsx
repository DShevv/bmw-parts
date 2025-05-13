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

export default async function Home() {
  const news = await getNews({ page: 1, perPage: 9 });
  /*   const promo = await getPromo({ page: 1, perPage: 10 }); */
  return (
    <>
      <Hero />
      <NewsModels news={news?.data ?? []} />
      <AboutBlock />
      <PopularSlider />
      <RecentPromo promo={news?.data ?? []} />
      <DeliveryPayment />
      <ContactsBlock />
      <SeoBlock page="main" />
      <Feedback />
    </>
  );
}
