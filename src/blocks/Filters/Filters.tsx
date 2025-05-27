"use client";
import clsx from "clsx";
import styles from "./Filters.module.scss";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import PriceFilter from "./PriceFilter/PriceFilter";
import CheckboxFilter from "./CheckboxFilter/CheckboxFilter";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import DropdownFilter from "./DropdownFilter/DropdownFilter";
import { useMemo } from "react";
import { GenerationT, SeriesT, BodyT } from "@/types/types";

interface FiltersProps {
  generations: GenerationT[];
  series: SeriesT[];
  bodies: BodyT[];
}

const Filters = observer(({ generations, series, bodies }: FiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );
  const pathname = usePathname();

  const searchOptions = useMemo(() => {
    return {
      generation: params.get("generation")?.split(",") || [],
      body: params.get("body")?.split(",") || [],
      series: params.get("series")?.split(",") || [],
      year: params.get("year"),
      price: params.get("price"),
      gearbox: params.get("gearbox"),
    };
  }, [params]);

  const { popupStore } = globalStore;
  const { closePopup } = popupStore;

  const filteredGenerations = useMemo(() => {
    if (searchOptions.series.length === 0) return generations;

    return generations.filter((generation) => {
      const seriesItem = series.find(
        (s) =>
          s.slug ===
          searchOptions.series.find((seriesSlug) => {
            const currentSeries = series.find((s) => s.slug === seriesSlug);
            return currentSeries && currentSeries.id === generation.series_id;
          })
      );
      return seriesItem !== undefined;
    });
  }, [generations, series, searchOptions.series]);

  const filteredBodies = useMemo(() => {
    if (searchOptions.generation.length === 0) return bodies;

    return bodies.filter((body) => {
      const generationItem = generations.find(
        (g) =>
          g.slug ===
          searchOptions.generation.find((generationSlug) => {
            const currentGeneration = generations.find(
              (g) => g.slug === generationSlug
            );
            return (
              currentGeneration && currentGeneration.id === body.generation_id
            );
          })
      );
      return generationItem !== undefined;
    });
  }, [bodies, generations, searchOptions.generation]);

  const resetFilters = () => {
    params.delete("price");
    params.delete("model");
    params.delete("year");
    params.delete("body");
    params.delete("series");
    params.delete("generation");
    params.delete("gearbox");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    closePopup("filters");
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={clsx("h1", styles.title)}>Фильтр</h3>

      <div className={styles.filters}>
        <PriceFilter title="Цена" name="price" />

        <CheckboxFilter
          title="Серия автомобиля"
          name="series"
          data={series.map((series) => {
            return { title: series.name, value: series.slug };
          })}
        />
        <CheckboxFilter
          disabled={searchOptions.series.length === 0}
          title="Поколение"
          name="generation"
          data={filteredGenerations.map((generation) => {
            return { title: generation.name, value: generation.slug };
          })}
        />

        <CheckboxFilter
          disabled={searchOptions.generation.length === 0}
          title="Кузов"
          name="body"
          data={filteredBodies.map((body) => {
            return { title: body.name, value: body.slug };
          })}
        />

        <DropdownFilter
          direction="top"
          title="КПП"
          name="gearbox"
          data={["Автомат", "Механика"]}
        />
        <DropdownFilter
          title="Год"
          name="year"
          data={[
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
            "2025",
          ]}
        />
      </div>
      <MainButton style="light" className={styles.reset} onClick={resetFilters}>
        Очистить фильтр
      </MainButton>
    </div>
  );
});

export default Filters;
