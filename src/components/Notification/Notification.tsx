"use client";
import { observer } from "mobx-react-lite";
import styles from "./Notification.module.scss";
import globalStore from "@/stores/global-store";
import clsx from "clsx";
import { SvgSquareCheck, SvgSquareClose } from "@/assets/icons/svgs";

const Notification = observer(() => {
  const { notificationStore } = globalStore;
  const { title, info, type, isVisible, removeNotification } =
    notificationStore;

  return (
    <div
      className={clsx(styles.wrapper, { [styles.active]: isVisible })}
      onClick={() => removeNotification()}
    >
      <div className={clsx(styles.item, { [styles.error]: type === "error" })}>
        {type === "success" && <SvgSquareCheck />}
        {type === "error" && <SvgSquareClose />}
        <div className={clsx("body-1", styles.title)}>{title}</div>
        <div className={clsx("body-3", styles.text)}>{info}</div>
      </div>
    </div>
  );
});

export default Notification;
