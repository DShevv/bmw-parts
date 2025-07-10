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
import { useEffect, useMemo, useState } from "react";
import { GenerationT, SeriesT, BodyT, FilterT } from "@/types/types";
import { getProducts } from "@/services/CatalogService";

interface FiltersProps {
  generations: GenerationT[];
  series: SeriesT[];
  bodies: BodyT[];
  categoryId: number | null;
  availableFilters: FilterT | null;
}

const Filters = observer(
  ({
    generations,
    series,
    bodies,
    categoryId,
    availableFilters,
  }: FiltersProps): React.ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [resetKey, setResetKey] = useState<number>(0);

    const searchOptions = useMemo(() => {
      // Получаем все параметры спецификаций из URL
      const specificationParams: { [key: string]: string[] } = {};

      // Проходим по всем параметрам и находим те, что начинаются с "specification_"
      for (const [key, value] of searchParams.entries()) {
        if (key.startsWith("specification_")) {
          specificationParams[key] = value.split(",");
        }
      }

      return {
        categoryId: categoryId,
        generation: searchParams.get("generation")?.split(",") || [],
        body: searchParams.get("body")?.split(",") || [],
        series: searchParams.get("series")?.split(",") || [],
        year: searchParams.get("year"),
        price: searchParams.get("price"),
        transmission: searchParams.get("transmission"),
        ...specificationParams,
      };
    }, [searchParams, categoryId]);

    const { popupStore } = globalStore;
    const { closePopup } = popupStore;

    // Создаем отдельную переменную для спецификаций (без price)
    const specificationFilters = useMemo(() => {
      return Object.entries(searchOptions)
        .filter(([key]) => key.startsWith("specification_"))
        .reduce((acc, [key, value]) => {
          if (Array.isArray(value)) {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, string[]>);
    }, [searchOptions]);

    useEffect(() => {
      // Если серия изменилась, проверяем валидность выбранных поколений
      const validGenerations = searchOptions.generation.filter(
        (generationSlug) => {
          const generation = generations.find((g) => g.slug === generationSlug);
          return (
            generation &&
            searchOptions.series.some((seriesSlug) => {
              const currentSeries = series.find((s) => s.slug === seriesSlug);
              return currentSeries && currentSeries.id === generation.series_id;
            })
          );
        }
      );

      // Если есть невалидные поколения, обновляем URL
      if (validGenerations.length !== searchOptions.generation.length) {
        const newParams = new URLSearchParams(searchParams.toString());

        if (validGenerations.length === 0) {
          newParams.delete("generation");
          newParams.delete("body");
        } else {
          newParams.set("generation", validGenerations.join(","));
        }

        // Сохраняем параметр page при автоматическом обновлении URL
        const currentPage = searchParams.get("page");
        if (currentPage) {
          newParams.set("page", currentPage);
        }

        router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
      }
    }, [
      searchOptions.series,
      searchOptions.generation,
      series,
      generations,
      searchParams,
      pathname,
      router,
    ]);

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
      // Переходим на чистый URL без параметров
      router.replace(pathname, { scroll: false });
      // Принудительно обновляем компоненты фильтров
      setResetKey((prev) => prev + 1);
      closePopup("filters");
    };

    useEffect(() => {
      const fetchMaxPrice = async () => {
        // Подготавливаем объект с параметрами для API БЕЗ фильтра по цене
        const apiParams: Record<string, string | number | null> = {
          categoryId: searchOptions.categoryId,
          generation: searchOptions.generation.join(","),
          series: searchOptions.series.join(","),
          body: searchOptions.body.join(","),
          year: searchOptions.year,
          transmission: searchOptions.transmission,
          // Исключаем price из параметров!
        };

        // Добавляем параметры спецификаций
        Object.entries(specificationFilters).forEach(([key, value]) => {
          apiParams[key] = value.join(",");
        });

        const products = await getProducts(apiParams);

        setMaxPrice(products?.max_price ?? null);
      };
      fetchMaxPrice();
    }, [
      searchOptions.categoryId,
      searchOptions.generation,
      searchOptions.series,
      searchOptions.body,
      searchOptions.year,
      searchOptions.transmission,
      specificationFilters,
      // Исключаем searchOptions.price из зависимостей!
    ]);

    return (
      <div className={styles.wrapper}>
        <h3 className={clsx("h1", styles.title)}>Фильтр</h3>

        <div className={styles.filters}>
          <DropdownFilter
            key={`year-${resetKey}`}
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
          <PriceFilter
            key={`price-${resetKey}`}
            title="Цена"
            name="price"
            maxPrice={maxPrice}
            minPrice={0}
          />

          <CheckboxFilter
            key={`series-${resetKey}`}
            title="Серия автомобиля"
            name="series"
            data={series.map((series) => {
              return { title: series.name, value: series.slug };
            })}
          />
          <CheckboxFilter
            key={`generation-${resetKey}`}
            disabled={
              searchOptions.series.length === 0 ||
              filteredGenerations.length === 0
            }
            title="Поколение"
            name="generation"
            data={filteredGenerations.map((generation) => {
              return { title: generation.name, value: generation.slug };
            })}
          />

          <CheckboxFilter
            key={`body-${resetKey}`}
            disabled={
              searchOptions.series.length === 0 ||
              searchOptions.generation.length === 0 ||
              filteredBodies.length === 0
            }
            title="Кузов"
            name="body"
            data={filteredBodies.map((body) => {
              return { title: body.name, value: body.slug };
            })}
          />

          <DropdownFilter
            key={`transmission-${resetKey}`}
            direction="top"
            title="КПП"
            name="transmission"
            data={["АКПП", "МКПП", "Вариатор", "Робот"]}
          />
          {availableFilters?.specifications.map((specification) => (
            <CheckboxFilter
              key={`specification_${specification.id}-${resetKey}`}
              title={specification.name}
              name={`specification_${specification.id}`}
              data={specification.values.map((value) => ({
                title: value.value,
                value: value.value,
              }))}
            />
          ))}
        </div>
        <MainButton
          style="light"
          className={styles.reset}
          onClick={resetFilters}
        >
          Очистить фильтр
        </MainButton>
      </div>
    );
  }
);

export default Filters;
