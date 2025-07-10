"use client";
import Select from "@/components/Select/Select";
import styles from "./page.module.scss";
import clsx from "clsx";
import FilterButton from "@/components/Buttons/FilterButton/FilterButton";
import ProductItem from "@/components/ProductItem/ProductItem";
import Pagination from "@/components/Pagination/Pagination";
import { getCategoriesBySlug, getProducts } from "@/services/CatalogService";
import { CategoryT, ProductT } from "@/types/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  const [products, setProducts] = useState<ProductT[] | null>(null);
  const [page, setPage] = useState<{ current: number; max: number }>({
    current: 1,
    max: 1,
  });
  const [sort, setSort] = useState<string>("name");
  const [categoryData, setCategoryData] = useState<CategoryT | null>(null);
  const paramsData = useParams();
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const searchOptions = useMemo(() => {
    // Получаем все параметры спецификаций из URL
    const specificationParams: { [key: string]: string | null } = {};

    // Проходим по всем параметрам и находим те, что начинаются с "specification_"
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith("specification_")) {
        specificationParams[key] = value;
      }
    }

    return {
      category: categoryData?.id?.toString() ?? undefined,
      generation: params.get("generation"),
      series: params.get("series"),
      body: params.get("body"),
      year: params.get("year"),
      price: params.get("price"),
      transmission: params.get("transmission"),
      page: parseInt(params.get("page") || "1", 10),
      sort: sort,
      ...specificationParams,
    };
  }, [params, sort, categoryData, searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (paramsData.category !== "all" && !categoryData) {
        return;
      }

      const products = await getProducts(searchOptions);

      setProducts(products?.data ?? []);
      setPage({
        current: parseInt(params.get("page") || "1", 10),
        max: products?.last_page ?? 1,
      });
    };
    fetchProducts();
  }, [searchOptions, params]);

  const handleSortChange = useCallback(
    (value: string) => {
      let sortValue = "name";

      switch (value) {
        case "Сначала дешевые":
          sortValue = "price";
          break;
        case "Сначала дорогие":
          sortValue = "-price";
          break;
        case "По алфавиту А-Я":
          sortValue = "name";
          break;
        case "По алфавиту Я-А":
          sortValue = "-name";
          break;
      }

      setSort(sortValue);

      // Сбрасываем page при изменении сортировки
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("page");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${newParams.toString()}`
      );
    },
    [searchParams]
  );

  useEffect(() => {
    const fetchCategoryData = async () => {
      console.log(paramsData.category);
      const categoryData = await getCategoriesBySlug(
        paramsData.category as string
      );
      setCategoryData(categoryData ?? null);
    };
    fetchCategoryData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={clsx("body-4", styles.count)}>
          товаров на странице:
          <span className="body-1">{products?.length}</span>
        </div>

        <div className={styles.mobileContainer}>
          <span className={clsx("body-1", styles.sort)}>Сортировка:</span>
          <Select
            className={styles.select}
            onChange={handleSortChange}
            defaultValue="По алфавиту А-Я"
            options={[
              "Сначала дешевые",
              "Сначала дорогие",
              "По алфавиту А-Я",
              "По алфавиту Я-А",
            ]}
          />
          <FilterButton />
        </div>
      </div>

      <div className={styles.container}>
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      {page.max > 1 && (
        <Pagination
          current={page.current}
          max={page.max}
          maxPerView={5}
          className={styles.pagination}
        />
      )}
    </div>
  );
};

export default Page;
