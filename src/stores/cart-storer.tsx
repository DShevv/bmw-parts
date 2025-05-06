import { makeAutoObservable } from "mobx";
import { CartStoreT } from "@/types/stores";
import { ProductT } from "@/types/types";
import { stopPersisting } from "mobx-persist-store";
import { makePersistable } from "mobx-persist-store";

class CartStore implements CartStoreT {
  cart: { [key: number]: { product: ProductT; count: number } } = {};

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      makePersistable(this, {
        name: "CartStore",
        properties: ["cart"],
        storage: window.localStorage,
        expireIn: 86400000 * 30,
        removeOnExpiration: true,
      });
    }
  }

  stopCartStore = () => {
    stopPersisting(this);
  };

  addToCart = (product: ProductT) => {
    if (this.isInCart(product)) {
      this.cart[product.id].count++;
    } else {
      this.cart[product.id] = { product, count: 1 };
    }
  };

  removeFromCart = (product: ProductT) => {
    delete this.cart[product.id];
  };

  removeOneFromCart = (product: ProductT) => {
    if (this.cart[product.id].count > 1) {
      this.cart[product.id].count--;
    }
  };

  removeAllFromCart = () => {
    this.cart = {};
  };

  isInCart = (product: ProductT) => {
    return this.cart[product.id] !== undefined;
  };

  getTotalPrice = () => {
    return Object.values(this.cart).reduce(
      (acc, item) => {
        const fullPrice = item.product.price * item.count;
        const discountedPrice = fullPrice * (1 - item.product.discount / 100);
        return {
          fullPrice: acc.fullPrice + fullPrice,
          discountedPrice: acc.discountedPrice + discountedPrice,
        };
      },
      { fullPrice: 0, discountedPrice: 0 }
    );
  };

  getTotalCount = () => {
    return Object.values(this.cart).reduce((acc, item) => acc + item.count, 0);
  };
}

export default CartStore;
