import CatalogBlock from "@/blocks/CatalogBlock/CatalogBlock";
import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import Feedback from "@/blocks/Feedback/Feedback";
import Hero from "@/blocks/Hero/Hero";
import PopularSlider from "@/blocks/PopularSlider/PopularSlider";
import RecentNews from "@/blocks/RecentNews/RecentNews";
import RecentPromo from "@/blocks/RecentPromo/RecentPromo";
import SeoBlock from "@/blocks/SeoBlock/SeoBlock";

export default async function Home() {
  return (
    <>
      <Hero />
      <CatalogBlock />
      <PopularSlider />
      <RecentPromo />
      <RecentNews />
      <ContactsBlock />
      <SeoBlock />
      <Feedback />
    </>
  );
}
