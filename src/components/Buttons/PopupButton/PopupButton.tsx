"use client";
import { observer } from "mobx-react-lite";
import styles from "./PopupButton.module.scss";
import globalStore from "@/stores/global-store";
import { SvgPhoneFilled } from "@/assets/icons/svgs";

const PopupButton = observer(() => {
  const { popupStore } = globalStore;
  const { openPopup } = popupStore;

  return (
    <button
      className={styles.container}
      onClick={() => openPopup("feedback")}
      aria-label="feedback-button"
    >
      <SvgPhoneFilled />
    </button>
  );
});

export default PopupButton;
