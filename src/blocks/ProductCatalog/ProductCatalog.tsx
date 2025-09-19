import React from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import clsx from "clsx";

interface ProductCatalogProps {
  text: string;
  image: string;
  imagePosition: "left" | "right";
}

export const ProductCatalog = ({
  text,
  image,
  imagePosition,
}: ProductCatalogProps) => {
  const htmlContent = typeof text === "string" ? text : "";

  return (
    <div
      className={clsx(s.container, {
        [s.left]: imagePosition === "left",
      })}
    >
      <div
        className={s.firstBlock}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <div className={s.secondBlock}>
        <Image
          src={`${process.env.NEXT_PUBLIC_STORE_URL}/${image}`}
          fill
          alt="product-catalog-image"
        />
      </div>
    </div>
  );
};
