import { getGenerations, getSeries } from "@/services/CarsService";
import HeroPopularModels from "../Hero/HeroPopularModels/HeroPopularModels";
import styles from "./NewsModels.module.scss";
import SingleNewsSlider from "./SingleNewsSlider/SingleNewsSlider";
import { NewsT } from "@/types/types";

interface NewsModelsProps {
  news: NewsT[];
}

const NewsModels = async ({ news }: NewsModelsProps) => {
  const series = await getSeries();
  const generations = await getGenerations();

  return (
    <section className={styles.wrapper}>
      <SingleNewsSlider news={news} />
      <HeroPopularModels series={series} generations={generations} />
    </section>
  );
};

export default NewsModels;
