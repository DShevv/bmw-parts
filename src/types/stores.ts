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
  timer: NodeJS.Timeout | undefined;

  setNotification: (title: string, info: string | undefined, type: string) => void;
  removeNotification: () => void;
};

export type GlobalStoreT = {
  popupStore: PopupStoreT;
  notificationStore: NotificationStoreT;
  favoritesStore: FavoritesStoreT;

  stopGlobalStore: () => void;
};

export type FavoritesStoreT = {
  favorites: { [key: number]: ProductT };

  addToFavorites: (product: ProductT) => void;
  removeFromFavorites: (product: ProductT) => void;
  toggleFavorite: (product: ProductT) => void;
  removeAllFavorites: () => void;
  isFavorite: (product: ProductT) => boolean;
  stopFavoriteStore: () => void;
};

export type CartStoreT = {
  cart: { [key: number]: { product: ProductT; count: number } };

  addToCart: (product: ProductT, count?: number) => void;
  removeFromCart: (product: ProductT) => void;
  removeOneFromCart: (product: ProductT) => void;
  removeAllFromCart: () => void;
  isInCart: (product: ProductT) => boolean;
  getTotalPrice: () => { fullPrice: number; discountedPrice: number };
  getTotalCount: () => number;
  stopCartStore: () => void;
};
