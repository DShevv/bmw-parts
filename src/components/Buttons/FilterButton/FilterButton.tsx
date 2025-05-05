"use client";
import { SvgFilter } from "@/assets/icons/svgs";
import styles from "./FilterButton.module.scss";
import clsx from "clsx";
import globalStore from "@/stores/global-store";
import { observer } from "mobx-react-lite";

const FilterButton = observer(() => {
  const { popupStore } = globalStore;
  const { openPopup } = popupStore;

  return (
    <button
      className={clsx("body-4", styles.container)}
      onClick={() => openPopup("filters")}
    >
      <span>Фильтр</span> <SvgFilter />
    </button>
  );
});

export default FilterButton;
