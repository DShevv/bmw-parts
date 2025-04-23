import { makeAutoObservable } from "mobx";
import { NotificationStoreT } from "@/types/stores";

class NotificationStore implements NotificationStoreT {
  title: string | undefined;
  info: string | undefined;
  type: string | undefined;
  isVisible: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setNotification = (title: string, info: string, type: string) => {
    this.title = title;
    this.type = type;
    this.info = info;
    this.isVisible = true;

    setTimeout(() => {
      this.removeNotification();
    }, 3000);
  };

  removeNotification = () => {
    this.isVisible = false;

    setTimeout(() => {
      this.title = undefined;
      this.info = undefined;
    }, 300);
  };
}

export default NotificationStore;
