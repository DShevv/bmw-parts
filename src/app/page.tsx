import CatalogBlock from "@/blocks/CatalogBlock/CatalogBlock";
import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import Feedback from "@/blocks/Feedback/Feedback";
import Hero from "@/blocks/Hero/Hero";
import PopularSlider from "@/blocks/PopularSlider/PopularSlider";
import RecentNews from "@/blocks/RecentNews/RecentNews";
import RecentPromo from "@/blocks/RecentPromo/RecentPromo";
import SeoBlock from "@/blocks/SeoBlock/SeoBlock";
import { getNews } from "@/services/NewsService";

export default async function Home() {
  const news = await getNews({ page: 1, perPage: 9 });
  /*   const promo = await getPromo({ page: 1, perPage: 10 }); */
  return (
    <>
      <Hero />
      <CatalogBlock />
      <PopularSlider />
      <RecentPromo promo={news?.data ?? []} />
      <RecentNews news={news?.data ?? []} />
      <ContactsBlock />
      <SeoBlock page="main" />
      <Feedback />
    </>
  );
}
