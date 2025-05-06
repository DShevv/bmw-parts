import NotificationStore from "./notification-store";
import PopupStore from "./popup-store";
import {
  FavoritesStoreT,
  GlobalStoreT,
  NotificationStoreT,
  PopupStoreT,
} from "@/types/stores";
import FavoritesStore from "./favorites-store";
import CartStore from "./cart-storer";
import { CartStoreT } from "@/types/stores";

class GlobalStore implements GlobalStoreT {
  notificationStore: NotificationStoreT;
  popupStore: PopupStoreT;
  favoritesStore: FavoritesStoreT;
  cartStore: CartStoreT;

  constructor(
    notificationStore: NotificationStoreT,
    popupStore: PopupStoreT,
    favoritesStore: FavoritesStoreT,
    cartStore: CartStoreT
  ) {
    this.notificationStore = notificationStore;
    this.popupStore = popupStore;
    this.favoritesStore = favoritesStore;
    this.cartStore = cartStore;
  }

  stopGlobalStore = () => {
    if (this.favoritesStore) {
      this.favoritesStore.stopFavoriteStore();
    }
    if (this.cartStore) {
      this.cartStore.stopCartStore?.();
    }
  };
}

const notificationStore = new NotificationStore();
const popupStore = new PopupStore();
const favoritesStore = new FavoritesStore();
const cartStore = new CartStore();

const globalStore = new GlobalStore(
  notificationStore,
  popupStore,
  favoritesStore,
  cartStore
);

export default globalStore;
