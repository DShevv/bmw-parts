"use client";
import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import FindModels from "@/blocks/FindModels/FindModels";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import FindBlock from "@/blocks/FindBlock/FindBlock";
import { CategoryT, SeriesT, GenerationT, BodyT } from "@/types/types";
import { getCategories } from "@/services/CatalogService";
import { getBodies } from "@/services/CarsService";
import { getGenerations } from "@/services/CarsService";
import { getSeries } from "@/services/CarsService";

const Page = () => {
  const [activeBody, setActiveBody] = useState<{
    series: SeriesT;
    body: BodyT;
    generation: GenerationT;
  } | null>(null);
  const [categories, setCategories] = useState<CategoryT[]>([]);
  const [series, setSeries] = useState<SeriesT[]>([]);
  const [generations, setGenerations] = useState<GenerationT[]>([]);
  const [bodies, setBodies] = useState<BodyT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [categories, series, generations, bodies] = await Promise.all([
        getCategories(),
        getSeries(),
        getGenerations(),
        getBodies(),
      ]);
      setCategories(categories ?? []);
      setSeries(series ?? []);
      setGenerations(generations ?? []);
      setBodies(bodies ?? []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (activeBody && activeBody?.body) {
      setTimeout(() => {
        const findBlock = document.querySelector("#find-block");

        if (findBlock) {
          findBlock.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [activeBody]);

  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Подбор запчастей для BMW", href: "/find-parts" },
          ]}
        />
        <h1 className={clsx(styles.title, "h1")}>Подбор запчастей для BMW</h1>
        <FindModels
          series={series ?? []}
          generations={generations ?? []}
          bodies={bodies ?? []}
          onChange={(series, body, generation) =>
            setActiveBody({ series, body, generation })
          }
        />
      </div>
      <AnimatePresence>
        {activeBody?.body && (
          <FindBlock
            carModel={{
              image: `${process.env.NEXT_PUBLIC_STORE_URL}/${activeBody.series.image_path}`,
              title: activeBody.body.name,
              series: activeBody.series,
              body: activeBody.body,
              generation: activeBody.generation,
            }}
          />
        )}
      </AnimatePresence>

      <Feedback categories={categories} />
    </>
  );
};

export default Page;
