import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import Pagination from "@/components/Pagination/Pagination";
import { promotions } from "@/data/dumpy-data";
import PromoItem from "@/components/PromoItem/PromoItem";

const page = () => {
  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Акции", href: "/promotions" },
          ]}
        />
        <h1 className={clsx(styles.title, "h1")}>Акции</h1>
        <section className={styles.container}>
          {promotions.map((promotion) => (
            <PromoItem promotion={promotion} key={promotion.id} />
          ))}
        </section>
        <Pagination
          current={2}
          max={10}
          maxPerView={5}
          className={styles.pagination}
        />
      </div>

      <Feedback />
    </>
  );
};

export default page;
