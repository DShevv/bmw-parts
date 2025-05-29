"use client";
import clsx from "clsx";
import styles from "./FindModels.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/grid";
import Image from "next/image";
import { useState } from "react";
import { motion as m, AnimatePresence } from "motion/react";
import { GenerationT, BodyT, SeriesT } from "@/types/types";

interface FindModelsProps {
  onChange: (series: SeriesT, body: BodyT, generation: GenerationT) => void;
  series: SeriesT[];
  generations: GenerationT[];
  bodies: BodyT[];
}

const FindModels = ({
  onChange,
  series,
  generations,
  bodies,
}: FindModelsProps) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeModel, setActiveModel] = useState<string | null>(null);

  return (
    <section className={styles.wrapper}>
      <h2 className={clsx("h2", styles.title)}>
        {activeId
          ? `Модификации автомобиля BMW ${
              series.find((item) => item.id === activeId)?.name
            }`
          : "Выберите модель автомобиля BMW"}
      </h2>
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView={"auto"}
        className={styles.swiper}
      >
        {series.map((item) => (
          <SwiperSlide
            key={item.id}
            className={styles.slide}
            onClick={() => setActiveId(item.id)}
          >
            <div
              className={clsx(styles.item, {
                [styles.active]: activeId === item.id,
              })}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STORE_URL}/${item.image_path}`}
                alt={item.name}
                width={104}
                height={60}
              />
              <div className={clsx("body-3", styles.title)}>{item.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnimatePresence>
        {activeId && (
          <m.div
            className={styles.modal}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Swiper
              modules={[FreeMode, Grid]}
              freeMode={true}
              slidesPerView={"auto"}
              className={styles.models}
              grid={{
                fill: "row",
                rows: 4,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 4,
                  grid: {
                    rows: 2,
                    fill: "row",
                  },
                },
              }}
            >
              {generations
                .filter((item) => item.series_id === activeId)
                .map((generation) => (
                  <SwiperSlide key={generation.id} className={styles.slide}>
                    <div key={generation.id} className={clsx(styles.infoItem)}>
                      <h4
                        className={clsx("h4", styles.infoTitle)}
                        title={generation.name}
                      >
                        {generation.name}
                      </h4>
                      <ul className={styles.infoList}>
                        {bodies
                          .filter(
                            (item) => item.generation_id === generation.id
                          )
                          .map((body) => (
                            <li key={body.id} className={styles.infoItem}>
                              <div
                                onClick={() => {
                                  setActiveModel(body.name);
                                  onChange(
                                    series.find(
                                      (item) => item.id === activeId
                                    ) ?? series[0],
                                    body,
                                    generation
                                  );
                                }}
                                className={clsx("body-2", styles.infoTitle, {
                                  [styles.active]: activeModel === body.name,
                                })}
                              >
                                {body.name}
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FindModels;
