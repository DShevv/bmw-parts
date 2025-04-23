import NotificationStore from "./notification-store";
import PopupStore from "./popup-store";
import { GlobalStoreT, NotificationStoreT, PopupStoreT } from "@/types/stores";

class GlobalStore implements GlobalStoreT {
  notificationStore: NotificationStoreT;
  popupStore: PopupStoreT;

  constructor(notificationStore: NotificationStoreT, popupStore: PopupStoreT) {
    this.notificationStore = notificationStore;
    this.popupStore = popupStore;
  }
}

const notificationStore = new NotificationStore();
const popupStore = new PopupStore();

const globalStore = new GlobalStore(notificationStore, popupStore);

export default globalStore;
