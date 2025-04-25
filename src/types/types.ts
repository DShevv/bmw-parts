import { StaticImageData } from "next/image";
export type ProductT = {
  id: number;
  image: StaticImageData | string;
  title: string;
  type: string;
  brand: string;
  price: number;
  discount: number;
  isAvailable: boolean;
};
