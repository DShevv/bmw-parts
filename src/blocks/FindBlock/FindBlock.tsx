import Image, { StaticImageData } from "next/image";
import styles from "./FindBlock.module.scss";
import clsx from "clsx";
import Select from "@/components/Select/Select";
import { useState } from "react";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { useRouter } from "next/navigation";
import { motion as m } from "motion/react";

interface FindBlockProps {
  carModel: {
    image: string | StaticImageData;
    title: string;
    series: string;
    model: string;
  };
}

const FindBlock = ({ carModel }: FindBlockProps) => {
  const [selectedRear, setSelectedRear] = useState<string>("Любой");
  const [selectedYear, setSelectedYear] = useState<string>("Любой");
  const [selectedGearbox, setSelectedGearbox] = useState<string>("Любая");
  const router = useRouter();

  console.log(carModel);

  return (
    <m.div
      id="find-block"
      className={styles.wrapper}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={carModel.image}
        alt={carModel.title}
        className={styles.image}
      />
      <div className={styles.container}>
        <div className={clsx("h2", styles.title)}>
          Автомобиль {carModel.title}
        </div>
        <div className={styles.selects}>
          <div className={styles.select}>
            <div className={clsx("body-1", styles.selectTitle)}>Руль</div>
            <Select
              className={styles.selectItem}
              defaultValue={selectedRear}
              options={["Любой", "Левый", "Правый"]}
              onChange={setSelectedRear}
            />
          </div>
          <div className={styles.select}>
            <div className={clsx("body-1", styles.selectTitle)}>Коробка</div>
            <Select
              className={styles.selectItem}
              defaultValue={selectedGearbox}
              options={["Любая", "Автоматическая", "Ручная"]}
              onChange={setSelectedGearbox}
            />
          </div>
          <div className={styles.select}>
            <div className={clsx("body-1", styles.selectTitle)}>
              Год выпуска
            </div>
            <Select
              className={styles.selectItem}
              defaultValue={selectedYear}
              options={[
                "Любой",
                "2025",
                "2024",
                "2023",
                "2022",
                "2021",
                "2020",
                "2019",
                "2018",
                "2017",
                "2016",
                "2015",
                "2014",
              ]}
              onChange={setSelectedYear}
            />
          </div>
        </div>
        <MainButton
          className={styles.button}
          onClick={() => {
            const query: Record<string, string> = {};

            if (selectedRear !== "Любой") {
              query["rear"] = selectedRear;
            }

            if (selectedGearbox !== "Любая") {
              query["gearbox"] = selectedGearbox;
            }

            if (selectedYear !== "Любой") {
              query["year"] = selectedYear;
            }

            if (carModel.series) {
              query["series"] = carModel.series;
            }

            if (carModel.model) {
              query["model"] = carModel.model;
            }

            router.push(
              `/catalog/all?${new URLSearchParams(query).toString()}`
            );
          }}
        >
          Перейти в каталог
        </MainButton>
      </div>
    </m.div>
  );
};

export default FindBlock;
