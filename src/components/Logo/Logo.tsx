"use client";
import styles from "./Logo.module.scss";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Logo = ({
  className,
  isFooter,
  image,
}: {
  className?: string;
  isFooter?: boolean;
  image?: string;
}) => {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <div
        className={clsx(styles.logo, className, { [styles.footer]: isFooter })}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_STORE_URL}/${image}`}
          alt="logo"
          width={66}
          height={66}
        />
        <div className={styles.caption}>
          ООО «Аэронавто»
          <span className={"body-2"}>Автозапчасти для BMW</span>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={"/"}
      className={clsx(styles.logo, className, { [styles.footer]: isFooter })}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_STORE_URL}/${image}`}
        alt="logo"
        width={66}
        height={66}
      />
      <div className={styles.caption}>
        ООО «Аэронавто»
        <span className={"body-2"}>Автозапчасти для BMW</span>
      </div>
    </Link>
  );
};

export default Logo;
