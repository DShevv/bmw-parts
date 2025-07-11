import Image, { StaticImageData } from "next/image";
import styles from "./FindBlock.module.scss";
import clsx from "clsx";
import Select from "@/components/Select/Select";
import { useState } from "react";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { useRouter } from "next/navigation";
import { motion as m } from "motion/react";
import { SeriesT, BodyT, GenerationT } from "@/types/types";

interface FindBlockProps {
  carModel: {
    image: string | StaticImageData;
    title: string;
    series: SeriesT;
    body: BodyT;
    generation: GenerationT;
  };
}

const FindBlock = ({ carModel }: FindBlockProps) => {
  const [selectedYear, setSelectedYear] = useState<string>("any");
  const [selectedtransmission, setSelectedtransmission] =
    useState<string>("any");
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
        width={282}
        height={282}
      />
      <div className={styles.container}>
        <div className={clsx("h2", styles.title)}>
          Автомобиль {carModel.title}
        </div>
        <div className={styles.selects}>
          {/*  <div className={styles.select}>
            <div className={clsx("body-1", styles.selectTitle)}>Руль</div>
            <Select
              className={styles.selectItem}
              defaultValue={{ title: "Любой", value: "any" }}
              options={[
                { title: "Любой", value: "any" },
                { title: "Левый", value: "left" },
                { title: "Правый", value: "right" },
              ]}
              onChange={setSelectedRear}
            />
          </div> */}
          <div className={styles.select}>
            <div className={clsx("body-1", styles.selectTitle)}>Коробка</div>
            <Select
              className={styles.selectItem}
              defaultValue={{
                title:
                  selectedtransmission === "any"
                    ? "Любая"
                    : selectedtransmission,
                value: selectedtransmission,
              }}
              options={[
                { title: "Любая", value: "any" },
                { title: "АКПП", value: "АКПП" },
                { title: "МКПП", value: "МКПП" },
                { title: "Вариатор", value: "Вариатор" },
                { title: "Робот", value: "Робот" },
              ]}
              onChange={setSelectedtransmission}
            />
          </div>
          <div className={styles.select}>
            <div className={clsx("body-1", styles.selectTitle)}>
              Год выпуска
            </div>
            <Select
              className={styles.selectItem}
              defaultValue={{
                title: selectedYear === "any" ? "Любой" : selectedYear,
                value: selectedYear,
              }}
              options={[
                { title: "Любой", value: "any" },
                { title: "2025", value: "2025" },
                { title: "2024", value: "2024" },
                { title: "2023", value: "2023" },
                { title: "2022", value: "2022" },
                { title: "2021", value: "2021" },
                { title: "2020", value: "2020" },
                { title: "2019", value: "2019" },
                { title: "2018", value: "2018" },
                { title: "2017", value: "2017" },
                { title: "2016", value: "2016" },
                { title: "2015", value: "2015" },
                { title: "2014", value: "2014" },
              ]}
              onChange={setSelectedYear}
            />
          </div>
        </div>
        <MainButton
          className={styles.button}
          onClick={() => {
            const query: Record<string, string> = {};

            if (selectedtransmission !== "any") {
              query["transmission"] = selectedtransmission;
            }

            if (selectedYear !== "any") {
              query["year"] = selectedYear;
            }

            if (carModel.series) {
              query["series"] = carModel.series.slug;
            }

            if (carModel.body) {
              query["body"] = carModel.body.slug;
            }

            if (carModel.generation) {
              query["generation"] = carModel.generation.slug;
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
