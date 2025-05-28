"use client";
import styles from "./FiltersSidebar.module.scss";
import Filters from "../Filters/Filters";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import clsx from "clsx";
import { SvgClose } from "@/assets/icons/svgs";
import { useEffect } from "react";
import { GenerationT, SeriesT, BodyT } from "@/types/types";

interface FiltersSidebarProps {
  generations: GenerationT[];
  series: SeriesT[];
  bodies: BodyT[];
  categoryId: number | null;
}

const FiltersSidebar = observer(
  ({ generations, series, bodies, categoryId }: FiltersSidebarProps) => {
    const { popupStore } = globalStore;
    const { filters } = popupStore;

    useEffect(() => {
      if (filters) {
        const scrollPosition = window.scrollY;

        document.body.style.position = "fixed";
        document.body.style.overflowY = "scroll";
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = "100%";

        return () => {
          document.body.style.position = "";
          document.body.style.overflowY = "auto";
          document.body.style.top = "";
          document.body.style.width = "";
          window.scrollTo(0, scrollPosition);
        };
      }
    }, [filters]);

    return (
      <div className={clsx(styles.sidebar, { [styles.active]: filters })}>
        <button
          className={styles.close}
          onClick={() => popupStore.closePopup("filters")}
        >
          <SvgClose />
        </button>
        <div className={styles.wrapper}>
          <Filters
            generations={generations}
            series={series}
            bodies={bodies}
            categoryId={categoryId}
          />
        </div>
      </div>
    );
  }
);

export default FiltersSidebar;
