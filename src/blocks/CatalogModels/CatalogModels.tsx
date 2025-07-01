"use client";
import clsx from "clsx";
import styles from "./CatalogModels.module.scss";

import Link from "next/link";
import { SeriesT, GenerationT, BodyT } from "@/types/types";
import { useState } from "react";

const CatalogModels = ({
  series,
  generations,
  bodies,
}: {
  series: SeriesT[];
  generations: GenerationT[];
  bodies: BodyT[];
}) => {
  const [activeSeries, setActiveSeries] = useState<SeriesT | null>(null);

  return (
    <section className={styles.wrapper}>
      <h2 className={clsx("h2", styles.title)}>
        {activeSeries
          ? `Модификации автомобиля BMW ${activeSeries.name}`
          : "Все модели"}
      </h2>
      <div className={styles.modal}>
        <div className={styles.models}>
          {(activeSeries
            ? generations.filter(
                (generation) => generation.series_id === activeSeries.id
              )
            : series
          ).map((item) => (
            <div key={item.id} className={styles.slide}>
              <div key={item.id} className={clsx(styles.infoItem)}>
                <div
                  className={clsx("h4", styles.infoTitle)}
                  title={item.name}
                  onClick={() => {
                    if (!activeSeries) {
                      setActiveSeries(item as SeriesT);
                    }
                  }}
                >
                  {item.name}
                </div>
                <ul className={styles.infoList}>
                  {(activeSeries
                    ? bodies.filter(
                        (body) => body.generation_id === activeSeries.id
                      )
                    : generations.filter(
                        (generation) => generation.series_id === item.id
                      )
                  ).map((generation) => (
                    <li key={generation.id} className={styles.infoItem}>
                      <Link
                        href={`/catalog/all?generation=${generation.slug}&series=${item.slug}`}
                        className={clsx("body-2", styles.infoTitle)}
                      >
                        {generation.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogModels;
