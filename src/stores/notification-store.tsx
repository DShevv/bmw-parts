import { makeAutoObservable } from "mobx";
import { NotificationStoreT } from "@/types/stores";

class NotificationStore implements NotificationStoreT {
  title: string | undefined;
  info: string | undefined;
  type: string | undefined;
  isVisible: boolean = false;
  timer: NodeJS.Timeout | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setNotification = (title: string, info: string | undefined, type: string) => {
    this.title = title;
    this.type = type;
    this.info = info;
    this.isVisible = true;

    this.timer = setTimeout(() => {
      this.removeNotification();
    }, 3000);
  };

  removeNotification = () => {
    this.isVisible = false;

    if (this.timer) {
      clearTimeout(this.timer);
    }
    setTimeout(() => {
      this.title = undefined;
      this.info = undefined;
    }, 300);
  };
}

export default NotificationStore;
