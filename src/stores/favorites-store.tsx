import { makeAutoObservable } from "mobx";
import { FavoritesStoreT } from "@/types/stores";
import { ProductT } from "@/types/types";
import { stopPersisting, makePersistable } from "mobx-persist-store";

class FavoritesStore implements FavoritesStoreT {
  favorites: { [key: number]: ProductT } = {};

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== "undefined") {
      makePersistable(this, {
        name: "FavoriteStore",
        properties: ["favorites"],
        storage: window.localStorage,
        expireIn: 86400000 * 30,
        removeOnExpiration: true,
      });
    }
  }

  stopFavoriteStore = () => {
    stopPersisting(this);
  };

  addToFavorites = (product: ProductT) => {
    this.favorites[product.id] = product;
  };

  toggleFavorite = (product: ProductT) => {
    if (this.isFavorite(product)) {
      this.removeFromFavorites(product);
    } else {
      this.addToFavorites(product);
    }
  };

  removeFromFavorites = (product: ProductT) => {
    delete this.favorites[product.id];
  };

  isFavorite = (product: ProductT) => {
    return this.favorites[product.id] !== undefined;
  };
}

export default FavoritesStore;
