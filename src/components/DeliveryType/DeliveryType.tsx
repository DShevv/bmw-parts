import clsx from "clsx";
import Checkbox from "../Inputs/Checkbox/Checkbox";
import styles from "./DeliveryType.module.scss";

interface DeliveryTypeProps {
  title: string;
  description: string;
  price: number;
  isSelected: boolean;
  onClick: () => void;
}

const DeliveryType = ({
  title,
  description,
  price,
  isSelected,
  onClick,
}: DeliveryTypeProps) => {
  return (
    <div
      className={clsx(styles.container, { [styles.active]: isSelected })}
      onClick={onClick}
    >
      <Checkbox checked={isSelected} onChange={onClick} />
      <div className={styles.caption}>
        <div className={clsx("body-1", styles.title)}>{title}</div>
        <div className={clsx("body-4", styles.description)}>{description}</div>
        <div className={clsx("h3", styles.price)}>
          {price === 0 ? "Бесплатно" : `${price} BYN`}
        </div>
      </div>
    </div>
  );
};

export default DeliveryType;
