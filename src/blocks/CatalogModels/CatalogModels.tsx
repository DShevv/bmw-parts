"use client";
import clsx from "clsx";
import styles from "./CatalogModels.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/grid";
import Image from "next/image";
import { useState } from "react";
import { motion as m, AnimatePresence } from "motion/react";
import Link from "next/link";
import { SeriesT, GenerationT, BodyT } from "@/types/types";

const CatalogModels = ({
  series,
  generations,
  bodies,
}: {
  series: SeriesT[];
  generations: GenerationT[];
  bodies: BodyT[];
}) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeSeries, setActiveSeries] = useState<SeriesT | null>(null);

  return (
    <section className={styles.wrapper}>
      <h2 className={clsx("h2", styles.title)}>
        {activeId
          ? `Кузова автомобиля BMW ${
              series.find((item) => item.id === activeId)?.name
            }`
          : "Все модели"}
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
            onClick={() => {
              setActiveId(item.id);
              setActiveSeries(item);
            }}
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
                    fill: "row",
                    rows: 2,
                  },
                },
              }}
            >
              {generations
                .filter((generation) => generation.series_id === activeId)
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
                            (body) => body.generation_id === generation.id
                          )
                          .map((body) => (
                            <li key={body.id} className={styles.infoItem}>
                              <Link
                                href={`/catalog/all?generation=${generation.slug}&body=${body.slug}&series=${activeSeries?.slug}`}
                                className={clsx("body-2", styles.infoTitle)}
                              >
                                {body.name}
                              </Link>
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

export default CatalogModels;
