import { ProductT } from "./types";

export type PopupStoreT = {
  menu: boolean;
  search: boolean;
  feedback: boolean;
  filters: boolean;
  order: boolean;
  orderProduct: { product: ProductT; count: number } | null;

  openPopup: (type: string, productInfo?: { product: ProductT; count: number }) => void;
  closePopup: (type: string) => void;
};

export type NotificationStoreT = {
  title: string | undefined;
  info: string | undefined;
  type: string | undefined;
  isVisible: boolean;

  setNotification: (title: string, info: string, type: string) => void;
  removeNotification: () => void;
};

export type GlobalStoreT = {
  popupStore: PopupStoreT;
  notificationStore: NotificationStoreT;
};
