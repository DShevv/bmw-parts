import HeroPopularModels from "../Hero/HeroPopularModels/HeroPopularModels";
import styles from "./NewsModels.module.scss";
import SingleNewsSlider from "./SingleNewsSlider/SingleNewsSlider";
import { NewsT } from "@/types/types";

interface NewsModelsProps {
  news: NewsT[];
}

const NewsModels = ({ news }: NewsModelsProps) => {
  return (
    <section className={styles.wrapper}>
      <SingleNewsSlider news={news} />
      <HeroPopularModels />
    </section>
  );
};

export default NewsModels;
