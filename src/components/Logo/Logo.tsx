import styles from "./Logo.module.scss";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import clsx from "clsx";

const Logo = ({
  className,
  isFooter,
}: {
  className?: string;
  isFooter?: boolean;
}) => {
  return (
    <Link
      href={"/"}
      className={clsx(styles.logo, className, { [styles.footer]: isFooter })}
    >
      <Image src={logo} alt="logo" />
      <div className={styles.caption}>
        ООО «Аэронавто»
        <span className={"body-2"}>Автозапчасти для BMW</span>
      </div>
    </Link>
  );
};

export default Logo;
