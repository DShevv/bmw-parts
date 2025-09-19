import React from "react";
import s from "./styles.module.scss";
import clsx from "clsx";

interface AboutTextBlockProps {
  text: string;
}

export const AboutTextBlock = ({ text }: AboutTextBlockProps) => {
  return (
    <div
      className={clsx(s.container)}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};
