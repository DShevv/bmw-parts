"use client";
import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import FindModels from "@/blocks/FindModels/FindModels";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import FindBlock from "@/blocks/FindBlock/FindBlock";
import { series } from "@/data/dumpy-data";

const Page = () => {
  const [activeId, setActiveId] = useState<{
    series: number;
    model: number;
  } | null>(null);

  useEffect(() => {
    if (activeId && activeId?.model && activeId?.series) {
      setTimeout(() => {
        const findBlock = document.querySelector("#find-block");
        console.log(findBlock);
        if (findBlock) {
          findBlock.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [activeId]);

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
          onChange={(series, model) => setActiveId({ series, model })}
        />
      </div>
      <AnimatePresence>
        {activeId?.series && activeId?.model && (
          <FindBlock
            carModel={{
              image: series[activeId.series].image,
              title: series[activeId.series].models[activeId.model].title,
              series: series[activeId.series].title,
              model: series[activeId.series].models[activeId.model].title,
            }}
          />
        )}
      </AnimatePresence>

      <Feedback />
    </>
  );
};

export default Page;
