import { makeAutoObservable } from "mobx";
import { PopupStoreT } from "@/types/stores";
import { ProductT } from "@/types/types";

class PopupStore implements PopupStoreT {
  feedback = false;
  menu = false;
  search = false;
  filters = false;
  order = false;
  orderProduct: { product: ProductT; count: number } | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openPopup = (
    type: string,
    productInfo?: { product: ProductT; count: number }
  ) => {
    this.orderProduct = productInfo ? productInfo : null;
    switch (type) {
      case "feedback":
        this.feedback = true;
        break;
      case "menu":
        this.menu = true;
        break;
      case "search":
        this.search = true;
        break;
      case "filters":
        this.filters = true;
        break;
      case "order":
        this.order = true;
        break;
    }
  };

  closePopup = (type: string) => {
    switch (type) {
      case "feedback":
        this.feedback = false;
        break;
      case "menu":
        this.menu = false;
        break;
      case "search":
        this.search = false;
        break;
      case "filters":
        this.filters = false;
        break;
      case "order":
        this.order = false;
        break;
    }
  };
}

export default PopupStore;
