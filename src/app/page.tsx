import CatalogBlock from "@/blocks/CatalogBlock/CatalogBlock";
import Hero from "@/blocks/Hero/Hero";
import PopularSlider from "@/blocks/PopularSlider/PopularSlider";

export default async function Home() {
  return (
    <>
      <Hero />
      <CatalogBlock />
      <PopularSlider />
    </>
  );
}
