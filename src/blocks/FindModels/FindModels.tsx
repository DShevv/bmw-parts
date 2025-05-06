"use client";
import clsx from "clsx";
import styles from "./FindModels.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/grid";
import { series } from "@/data/dumpy-data";
import Image from "next/image";
import { useState } from "react";
import { motion as m, AnimatePresence } from "motion/react";

interface FindModelsProps {
  onChange: (model: number, series: number) => void;
}

const FindModels = ({ onChange }: FindModelsProps) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeModel, setActiveModel] = useState<string | null>(null);

  return (
    <section className={styles.wrapper}>
      <h2 className={clsx("h2", styles.title)}>
        {activeId
          ? `Модификации автомобиля BMW ${
              series.find((item) => item.id === activeId)?.title
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
              <Image src={item.image} alt={item.title} />
              <div className={clsx("body-3", styles.title)}>{item.title}</div>
            </div>
          </SwiperSlide>
        ))}
        {series.map((item) => (
          <SwiperSlide
            key={item.id + 10}
            className={styles.slide}
            onClick={() => setActiveId(item.id)}
          >
            <div
              className={clsx(styles.item, {
                [styles.active]: activeId === item.id,
              })}
            >
              <Image src={item.image} alt={item.title} />
              <div className={clsx("body-3", styles.title)}>{item.title}</div>
            </div>
          </SwiperSlide>
        ))}
        {series.map((item) => (
          <SwiperSlide
            key={item.id + 40}
            className={styles.slide}
            onClick={() => setActiveId(item.id)}
          >
            <div
              className={clsx(styles.item, {
                [styles.active]: activeId === item.id,
              })}
            >
              <Image src={item.image} alt={item.title} />
              <div className={clsx("body-3", styles.title)}>{item.title}</div>
            </div>
          </SwiperSlide>
        ))}

        {series.map((item) => (
          <SwiperSlide
            key={item.id + 50}
            className={styles.slide}
            onClick={() => setActiveId(item.id)}
          >
            <div
              className={clsx(styles.item, {
                [styles.active]: activeId === item.id,
              })}
            >
              <Image src={item.image} alt={item.title} />
              <div className={clsx("body-3", styles.title)}>{item.title}</div>
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
                  grid: {
                    rows: 2,
                  },
                },
              }}
            >
              {series
                .find((item) => item.id === activeId)
                ?.models.map((model) => (
                  <SwiperSlide key={model.id} className={styles.slide}>
                    <div key={model.id} className={clsx(styles.infoItem)}>
                      <h4 className={clsx("h4", styles.infoTitle)}>
                        {model.title}
                      </h4>
                      <ul className={styles.infoList}>
                        {model.models.map((model) => (
                          <li key={model.id} className={styles.infoItem}>
                            <div
                              onClick={() => {
                                setActiveModel(model.title);
                                onChange(model.id, activeId);
                              }}
                              className={clsx("body-2", styles.infoTitle, {
                                [styles.active]: activeModel === model.title,
                              })}
                            >
                              {model.title}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SwiperSlide>
                ))}
              {series
                .find((item) => item.id === activeId)
                ?.models.map((model) => (
                  <SwiperSlide key={model.id} className={styles.slide}>
                    <div key={model.id} className={clsx(styles.infoItem)}>
                      <h4 className={clsx("h4", styles.infoTitle)}>
                        {model.title}
                      </h4>
                      <ul className={styles.infoList}>
                        {model.models.map((model) => (
                          <li key={model.id} className={styles.infoItem}>
                            <div
                              onClick={() => {
                                setActiveModel(model.title);
                                onChange(model.id, activeId);
                              }}
                              className={clsx("body-2", styles.infoTitle, {
                                [styles.active]: activeModel === model.title,
                              })}
                            >
                              {model.title}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SwiperSlide>
                ))}
              {series
                .find((item) => item.id === activeId)
                ?.models.map((model) => (
                  <SwiperSlide key={model.id} className={styles.slide}>
                    <div key={model.id} className={clsx(styles.infoItem)}>
                      <h4 className={clsx("h4", styles.infoTitle)}>
                        {model.title}
                      </h4>
                      <ul className={styles.infoList}>
                        {model.models.map((model) => (
                          <li key={model.id} className={styles.infoItem}>
                            <div
                              onClick={() => {
                                setActiveModel(model.title);
                                onChange(model.id, activeId);
                              }}
                              className={clsx("body-2", styles.infoTitle, {
                                [styles.active]: activeModel === model.title,
                              })}
                            >
                              {model.title}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SwiperSlide>
                ))}
              {series
                .find((item) => item.id === activeId)
                ?.models.map((model) => (
                  <SwiperSlide key={model.id} className={styles.slide}>
                    <div key={model.id} className={clsx(styles.infoItem)}>
                      <h4 className={clsx("h4", styles.infoTitle)}>
                        {model.title}
                      </h4>
                      <ul className={styles.infoList}>
                        {model.models.map((model) => (
                          <li key={model.id} className={styles.infoItem}>
                            <div
                              onClick={() => {
                                setActiveModel(model.title);
                                onChange(model.id, activeId);
                              }}
                              className={clsx("body-2", styles.infoTitle, {
                                [styles.active]: activeModel === model.title,
                              })}
                            >
                              {model.title}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SwiperSlide>
                ))}
              {series
                .find((item) => item.id === activeId)
                ?.models.map((model) => (
                  <SwiperSlide key={model.id} className={styles.slide}>
                    <div key={model.id} className={clsx(styles.infoItem)}>
                      <h4 className={clsx("h4", styles.infoTitle)}>
                        {model.title}
                      </h4>
                      <ul className={styles.infoList}>
                        {model.models.map((model) => (
                          <li key={model.id} className={styles.infoItem}>
                            <div
                              onClick={() => {
                                setActiveModel(model.title);
                                onChange(model.id, activeId);
                              }}
                              className={clsx("body-2", styles.infoTitle, {
                                [styles.active]: activeModel === model.title,
                              })}
                            >
                              {model.title}
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
