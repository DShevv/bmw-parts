import clsx from "clsx";
import styles from "./Hero.module.scss";
import HeroBannerSlider from "./HeroBannerSlider/HeroBannerSlider";
import HeroPopularModels from "./HeroPopularModels/HeroPopularModels";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1 className={clsx("h1", styles.title)}>
        Автозапчасти и аксессуары для BMW в Минске
      </h1>

      <div className={styles.container}>
        <HeroBannerSlider />
        <HeroPopularModels />
      </div>
    </section>
  );
};

export default Hero;
