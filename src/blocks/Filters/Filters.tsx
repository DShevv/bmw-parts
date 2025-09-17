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
import { useEffect, useMemo, useState, useRef } from "react";
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
    const isUpdatingRef = useRef<boolean>(false);
    const prevSearchRef = useRef<string | null>(null);

    //находим активный geterations если он есть и вычисляем года по тому что нам приходит.
    const activeGeneration = generations.find(
      (elem) => elem.slug === searchParams.get("generation")
    );
    const getYears = () => {
      const currentYear = new Date().getFullYear();

      const start = activeGeneration?.production_year_start || 1980;
      const end = activeGeneration?.production_year_end || currentYear;

      const yearsArr = [];

      for (let i = start; i <= end; i++) {
        yearsArr.push({ title: String(i), value: String(i) });
      }

      return yearsArr;
    };

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
      // Предотвращаем циклические обновления
      if (isUpdatingRef.current) {
        return;
      }

      // Получаем текущий поисковый запрос
      const currentSearch = searchParams.get("search");

      // Если изменился только поисковый запрос (а не фильтры), пропускаем валидацию
      if (
        prevSearchRef.current !== null &&
        prevSearchRef.current !== currentSearch
      ) {
        prevSearchRef.current = currentSearch;
        return;
      }

      // Обновляем предыдущий поисковый запрос
      prevSearchRef.current = currentSearch;

      // Пропускаем валидацию если нет серий для проверки
      if (searchOptions.series.length === 0) {
        return;
      }

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
        isUpdatingRef.current = true;

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

        // Сбрасываем флаг после небольшой задержки
        setTimeout(() => {
          isUpdatingRef.current = false;
        }, 100);
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
            data={getYears()}
          />
          <PriceFilter
            key={`price-${resetKey}`}
            title="Цена"
            name="price"
            maxPrice={maxPrice}
            minPrice={0}
          />

          <DropdownFilter
            key={`series-${resetKey}`}
            title="Серия автомобиля"
            name="series"
            data={series.map((series) => ({
              title: series.name,
              value: series.slug,
            }))}
          />
          <DropdownFilter
            key={`generation-${resetKey}`}
            disabled={
              searchOptions.series.length === 0 ||
              filteredGenerations.length === 0
            }
            direction={
              availableFilters
                ? availableFilters.specifications.length === 0
                  ? "top"
                  : "bottom"
                : "top"
            }
            title="Поколение"
            name="generation"
            data={filteredGenerations.map((generation) => ({
              title: generation.name,
              value: generation.slug,
            }))}
          />

          <DropdownFilter
            key={`body-${resetKey}`}
            direction={
              availableFilters
                ? availableFilters.specifications.length < 2
                  ? "top"
                  : "bottom"
                : "top"
            }
            disabled={
              searchOptions.series.length === 0 ||
              searchOptions.generation.length === 0 ||
              filteredBodies.length === 0
            }
            title="Кузов"
            name="body"
            data={filteredBodies.map((body) => ({
              title: body.name,
              value: body.slug,
            }))}
          />

          <DropdownFilter
            key={`transmission-${resetKey}`}
            direction="top"
            title="КПП"
            name="transmission"
            data={[
              { title: "АКПП", value: "АКПП" },
              { title: "МКПП", value: "МКПП" },
              { title: "Вариатор", value: "Вариатор" },
              { title: "Робот", value: "Робот" },
            ]}
          />
          {availableFilters?.specifications.map(
            (specification, index, array) => {
              console.log(
                specification.filter_type,
                index === array.length - 1 ? "top" : "bottom"
              );

              if (specification.filter_type === "checkbox") {
                return (
                  <CheckboxFilter
                    key={`specification_${specification.id}-${resetKey}`}
                    title={specification.name}
                    name={`specification_${specification.id}`}
                    data={specification.values.map((value) => ({
                      title: value.value,
                      value: value.value,
                    }))}
                  />
                );
              } else if (specification.filter_type === "dropdown") {
                return (
                  <DropdownFilter
                    direction={
                      index === array.length - 1 || index === array.length - 2
                        ? "top"
                        : "bottom"
                    }
                    key={`specification_${specification.id}-${resetKey}`}
                    title={specification.name}
                    name={`specification_${specification.id}`}
                    data={specification.values.map((value) => ({
                      title: value.value,
                      value: value.value,
                    }))}
                  />
                );
              } else if (specification.filter_type === "range") {
                return (
                  <PriceFilter
                    key={`specification_${specification.id}-${resetKey}`}
                    title={specification.name}
                    name={`specification_${specification.id}`}
                    maxPrice={specification.values.reduce((max, value) => {
                      return Math.max(max, Number(value.value));
                    }, 0)}
                    minPrice={0}
                  />
                );
              } else {
                return null;
              }
            }
          )}
        </div>
        <MainButton
          className={styles.reset}
          onClick={() => closePopup("filters")}
        >
          Применить
        </MainButton>
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
