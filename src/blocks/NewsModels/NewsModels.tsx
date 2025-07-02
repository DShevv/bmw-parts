import { getBodies, getGenerations, getSeries } from "@/services/CarsService";
import HeroPopularModels from "../Hero/HeroPopularModels/HeroPopularModels";
import styles from "./NewsModels.module.scss";
import SingleNewsSlider from "./SingleNewsSlider/SingleNewsSlider";
import { NewsT } from "@/types/types";
import clsx from "clsx";

interface NewsModelsProps {
  news: NewsT[];
}

const NewsModels = async ({ news }: NewsModelsProps) => {
  const series = await getSeries();
  const generations = await getGenerations();
  const bodies = await getBodies();

  return (
    <div>
      <h1 className={clsx("h1", styles.title)}>
        Автозапчасти и аксессуары для BMW в Минске
      </h1>
      <section className={styles.wrapper}>
        <SingleNewsSlider news={news} />
        <HeroPopularModels
          series={series}
          generations={generations}
          bodies={bodies}
        />
      </section>
    </div>
  );
};

export default NewsModels;
