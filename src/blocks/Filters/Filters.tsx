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

const Filters = observer(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();

  const { popupStore } = globalStore;
  const { closePopup } = popupStore;

  const resetFilters = () => {
    params.delete("price");
    params.delete("model");
    params.delete("year");
    params.delete("body");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    closePopup("filters");
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={clsx("h1", styles.title)}>Фильтр</h3>

      <div className={styles.filters}>
        <PriceFilter title="Цена" name="price" />

        <CheckboxFilter
          title="Модель автомобиля"
          name="model"
          data={["X1", "X2", "X3", "X4", "X5"]}
        />
        <CheckboxFilter
          title="Серия автомобиля"
          name="model"
          data={[
            "(E84) xDrive 28 i",
            "(E84) xDrive 28 i",
            "(E84) xDrive 28 i",
            "(E84) xDrive 28 i",
            "(E84) xDrive 28 i",
          ]}
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
        <DropdownFilter
          direction="top"
          title="Кузов"
          name="body"
          data={[
            "Седан",
            "Хетчбек",
            "Универсал",
            "Купе",
            "Кабриолет",
            "Внедорожник",
            "Кроссовер",
            "Минивэн",
            "Пикап",
            "Фургон",
            "Другой",
          ]}
        />
      </div>
      <MainButton style="light" className={styles.reset} onClick={resetFilters}>
        Сбросить фильтр
      </MainButton>
    </div>
  );
});

export default Filters;
