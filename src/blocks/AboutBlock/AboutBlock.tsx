"use client";

import Image from "next/image";
import styles from "./AboutBlock.module.scss";
import Logo from "@/components/Logo/Logo";
import clsx from "clsx";
import { getSetting } from "@/services/InfoService";
import { useEffect, useState } from "react";
import { SettingT } from "@/types/types";

interface AboutBlockProps {
  title?: string;
}

const AboutBlock = ({ title }: AboutBlockProps) => {
  const [setting, setSetting] = useState<SettingT | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSetting();
      setSetting(data);
    };
    fetchSettings();
  }, []);

  if (!setting) return null;

  return (
    <section className={styles.wrapper}>
      <div className={styles.bg}>
        <Image
          src={`${process.env.NEXT_PUBLIC_STORE_URL}/${setting?.about.image}`}
          alt="about"
          width={1296}
          height={440}
        />
      </div>
      <div className={styles.content}>
        <Logo className={styles.logo} image={setting?.logo_path} />

        <div className={styles.caption}>
          {!!title && <h2 className={clsx("h2", styles.title)}>{title}</h2>}
          <p
            className={clsx("body-1", styles.text)}
            dangerouslySetInnerHTML={{ __html: setting?.about.text ?? "" }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutBlock;
