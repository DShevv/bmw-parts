import Image from "next/image";
import styles from "./AboutBlock.module.scss";
import Logo from "@/components/Logo/Logo";
import clsx from "clsx";
import { getSetting } from "@/services/InfoService";

const AboutBlock = async () => {
  const setting = await getSetting();
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
          <h2 className={clsx("h2", styles.title)}>О нашей компании</h2>
          <p className={clsx("body-1", styles.text)}>{setting?.about.text}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutBlock;
