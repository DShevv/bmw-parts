import wheel from "@/assets/images/wheel.png";
import tools from "@/assets/images/tools.png";
import oil from "@/assets/images/oil.png";
import wheelHd from "@/assets/images/wheel-hd.png";
import { SvgCar, SvgEngine, SvgOil, SvgWheel } from "@/assets/icons/svgs";

import visaSecure from "@/assets/images/payments/visa-secure.png";
import visa from "@/assets/images/payments/visa.png";
import mastercard from "@/assets/images/payments/marstercard.png";
import alfa from "@/assets/images/payments/alfa.png";
import belcard from "@/assets/images/payments/belcard.png";
import belcardInternet from "@/assets/images/payments/belcard-internet.png";
import samsung from "@/assets/images/payments/samsung-pay.png";
import apple from "@/assets/images/payments/apple.png";
import slide1 from "@/assets/images/slide.png";
import carModel from "@/assets/images/car-model.png";
import { ProductT } from "@/types/types";

export const categories = [
  {
    id: 1,
    name: "Диски",
    image: wheel,
    children: [
      {
        id: 1,
        name: "Фрикционные диски",
        image: wheel,
      },
      {
        id: 2,
        name: "Стальные диски",
        image: wheel,
      },
      {
        id: 3,
        name: "Легкосплавные диски",
        image: wheel,
      },
      {
        id: 4,
        name: "Кованые диски",
        image: wheel,
      },
      {
        id: 5,
        name: "Литые диски",
        image: wheel,
      },
      {
        id: 6,
        name: "Штампованные диски",
        image: wheel,
      },
      {
        id: 7,
        name: "Составные диски",
        image: wheel,
      },
      {
        id: 8,
        name: "Спортивные диски",
        image: wheel,
      },
      {
        id: 9,
        name: "Хромированные диски",
        image: wheel,
      },
      {
        id: 10,
        name: "Полированные диски",
        image: wheel,
      },
      {
        id: 11,
        name: "Матовые диски",
        image: wheel,
      },
      {
        id: 12,
        name: "Глянцевые диски",
        image: wheel,
      },
      {
        id: 13,
        name: "Кастомные диски",
        image: wheel,
      },
      {
        id: 14,
        name: "Диски для внедорожников",
        image: wheel,
      },
      {
        id: 15,
        name: "Диски для легковых авто",
        image: wheel,
      },
      {
        id: 16,
        name: "Диски для грузовиков",
        image: wheel,
      },
      {
        id: 17,
        name: "Диски премиум класса",
        image: wheel,
      },
      {
        id: 18,
        name: "Диски эконом класса",
        image: wheel,
      },
      {
        id: 19,
        name: "Диски для спецтехники",
        image: wheel,
      },
      {
        id: 20,
        name: "Диски для мотоциклов",
        image: wheel,
      },
      {
        id: 21,
        name: "Диски для квадроциклов",
        image: wheel,
      },
      {
        id: 22,
        name: "Диски для снегоходов",
        image: wheel,
      },
      {
        id: 23,
        name: "Диски для тракторов",
        image: wheel,
      },
      {
        id: 24,
        name: "Диски для спецтехники",
        image: wheel,
      },
      {
        id: 25,
        name: "Диски для грузовиков",
        image: wheel,
      },
      {
        id: 26,
        name: "Диски для спецтехники",
        image: wheel,
      },
      {
        id: 27,
        name: "Диски для спецтехники",
        image: wheel,
      },
      {
        id: 28,
        name: "Диски для спецтехники",
        image: wheel,
      },


    ],
  },
  {
    id: 2,
    name: "Масла и автохимия",
    image: oil,
    children: [
      {
        id: 1,
        name: "Фрикционные диски",
        image: wheel,
      },
      {
        id: 2,
        name: "Стальные диски",
        image: wheel,
      },
      {
        id: 3,
        name: "Легкосплавные диски",
        image: wheel,
      },
      {
        id: 4,
        name: "Кованые диски",
        image: wheel,
      },
      {
        id: 5,
        name: "Литые диски",
        image: wheel,
      },
      {
        id: 6,
        name: "Штампованные диски",
        image: wheel,
      },
      {
        id: 7,
        name: "Составные диски",
        image: wheel,
      },
      {
        id: 8,
        name: "Спортивные диски",
        image: wheel,
      },
      {
        id: 9,
        name: "Хромированные диски",
        image: wheel,
      }

    ],
  },
  {
    id: 3,
    name: "Инструменты",
    image: tools,
    children: [
      {
        id: 1,
        name: "Фрикционные диски",
        image: wheel,
      },
      {
        id: 2,
        name: "Стальные диски",
        image: wheel,
      },
      {
        id: 3,
        name: "Легкосплавные диски",
        image: wheel,
      },
      {
        id: 4,
        name: "Кованые диски",
        image: wheel,
      }
    ],
  },
  {
    id: 4,
    name: "Уход за автомобилем",
    image: wheel,
    children: [
      {
        id: 1,
        name: "Фрикционные диски",
        image: wheel,
      },
      {
        id: 2,
        name: "Стальные диски",
        image: wheel,
      },
      {
        id: 3,
        name: "Легкосплавные диски",
        image: wheel,
      },
      {
        id: 4,
        name: "Кованые диски",
        image: wheel,
      },
      {
        id: 5,
        name: "Литые диски",
        image: wheel,
      },
      {
        id: 6,
        name: "Штампованные диски",
        image: wheel,
      },
      {
        id: 7,
        name: "Составные диски",
        image: wheel,
      },
      {
        id: 8,
        name: "Спортивные диски",
        image: wheel,
      },
      {
        id: 9,
        name: "Хромированные диски",
        image: wheel,
      },
      {
        id: 10,
        name: "Полированные диски",
        image: wheel,
      },
      {
        id: 11,
        name: "Матовые диски",
        image: wheel,
      },
      {
        id: 12,
        name: "Глянцевые диски",
        image: wheel,
      },
      {
        id: 13,
        name: "Кастомные диски",
        image: wheel,
      },
      {
        id: 14,
        name: "Диски для внедорожников",
        image: wheel,
      },
      {
        id: 15,
        name: "Диски для легковых авто",
        image: wheel,
      },

    ],
  },
];

export const searchData = [
  {
    id: 1,
    name: "Диск колёсный 6 × 15 | 4 × 100 ET48 D54,1 BMW X1",
    image: wheelHd,
    sku: "1234567890",
    price: 400,
    discount: 20,
  },
  {
    id: 2,
    name: "Масло моторное 5W-40",
    image: wheelHd,
    sku: "1234567890",
    price: 40000,
    discount: 0,
  },
  {
    id: 3,
    name: "Масло моторное 5W-40",
    image: wheelHd,
    sku: "1234567890",
    price: 4000,
    discount: 20,
  },
  {
    id: 4,
    name: "Масло моторное 5W-40",
    image: wheelHd,
    sku: "1234567890",
    price: 400,
    discount: 20,
  },
  {
    id: 5,
    name: "Масло моторное 5W-40",
    image: wheelHd,
    sku: "1234567890",
    price: 400,
    discount: 0,
  },
];

export const categoriesData = [
  {
    id: 1,
    name: "Диски",
    image: SvgWheel
  },
  {
    id: 2,
    name: "Масла и автохимия",
    image: SvgOil
  },
  {
    id: 3,
    name: "Инструменты",
    image: SvgEngine
  },
  {
    id: 4,
    name: "Уход за автомобилем",
    image: SvgCar
  }

]

export const paymentMethods = [
  {
    id: 1,
    name: "Visa",
    image: visa,
  },
  {
    id: 2,
    name: "Mastercard",
    image: mastercard,
  },
  {
    id: 3,
    name: "Альфа-банк",
    image: alfa,
  },
  {
    id: 4,
    name: "Белкард",
    image: belcard,
  },
  {
    id: 5,
    name: "Белкард интернет",
    image: belcardInternet,
  },
  {
    id: 6,
    name: "Samsung Pay",
    image: samsung,
  },
  {
    id: 7,
    name: "Apple Pay",
    image: apple,
  },
  {
    id: 8,
    name: "Visa Secure",
    image: visaSecure,
  },
]


export const HeroSlides = [
  {
    id: 1,
    image: slide1,
    title: "Скидка до 20% на тормозные колодки и диски",
    buttonLink: "/link1",
  },
  {
    id: 2,
    image: slide1,
    title: "Скидка до 20% на тормозные колодки и диски 2",
    buttonLink: "/link2",
  },
  {
    id: 3,
    image: slide1,
    title: "Скидка до 20% на тормозные колодки и диски 3",
    buttonLink: "/link3",
  },
];

export const series = [
  {
    id: 1,
    image: carModel,
    title: "1 серия",
    models: [
      {
        id: 1,
        title: "1 (e87)",

      },
      {
        id: 2,
        title: "1 купе (E82)",
      },
      {
        id: 3,
        title: "1 Кабриолет (E88)",
      },

    ]
  },
  {
    id: 2,
    image: carModel,
    title: "2 серия",
    models: [
      {
        id: 1,
        title: "2 (e88)",
      },
      {
        id: 2,
        title: "2 купе (E89)",
      },
      {
        id: 3,
        title: "2 хэтчбек (E83)",
      },
      {
        id: 4,
        title: "2 хэтчбек (E83)",
      },
    ]
  },
  {
    id: 3,
    image: carModel,
    title: "3 серия",
    models: [
      {
        id: 1,
        title: "3 (e90)",
      },
      {
        id: 2,
        title: "3 купе (E92)",
      },
      {
        id: 3,
        title: "3 хэтчбек (E93)",
      },
      {
        id: 4,
        title: "3 хэтчбек (E93)",
      },
    ]
  }
]

export const popularProducts: ProductT[] = [
  {
    id: 1068298034,
    image: wheelHd,
    title: "Диск колёсный 6 × 15 | 4 × 100 ET48 D54,1 BMW X1",
    type: "6HP26, 6HP26A, 6HP26A61, 6HP26X",
    brand: "ZF",
    price: 1000,
    discount: 20,
    isAvailable: true,
  },
  {
    id: 1068298035,
    image: wheelHd,
    title: "Диск колёсный 6 × 15 | 4 × 100 ET48 D54,1 BMW X1",
    type: "6HP26, 6HP26A, 6HP26A61, 6HP26X",
    brand: "ZF",
    price: 400,
    discount: 0,
    isAvailable: true,
  },
  {
    id: 1068298036,
    image: wheelHd,
    title: "Диск литой R17 5x120 BMW 3 Series F30",
    type: "6HP26, 6HP26A, 6HP26A61, 6HP26X",
    brand: "ZF",
    price: 850,
    discount: 15,
    isAvailable: true,
  },
  {
    id: 1068298037,
    image: wheelHd,
    title: "Диск кованый R18 5x112 BMW 5 Series G30",
    type: "6HP26, 6HP26A, 6HP26A61, 6HP26X",
    brand: "ZF",
    price: 1200,
    discount: 10,
    isAvailable: true,
  },
  {
    id: 1068298038,
    image: wheelHd,
    title: "Диск легкосплавный R19 5x120 BMW X5 E70",
    type: "6HP26, 6HP26A, 6HP26A61, 6HP26X",
    brand: "ZF",
    price: 950,
    discount: 25,
    isAvailable: true,
  },
  {
    id: 1068298039,
    image: wheelHd,
    title: "Диск спортивный R20 5x120 BMW M4 F82",
    type: "6HP26, 6HP26A, 6HP26A61, 6HP26X",
    brand: "ZF",
    price: 1500,
    discount: 5,
    isAvailable: true,
  },
  {
    id: 1068298040,
    image: wheelHd,
    title: "Диск штампованный R16 5x120 BMW 3 Series E90",
    type: "6HP26, 6HP26A, 6HP26A61, 6HP26X",
    brand: "ZF",
    price: 300,
    discount: 0,
    isAvailable: true,
  },
  {
    id: 1068298041,
    image: wheelHd,
    title: "Диск составной R21 5x120 BMW X7 G07",
    type: "6HP26, 6HP26A, 6HP26A61, 6HP26X",
    brand: "ZF",
    price: 1800,
    discount: 12,
    isAvailable: true,
  },
  {
    id: 1068298042,
    image: wheelHd,
    title: "Диск полированный R18 5x120 BMW 7 Series G11",
    type: "6HP26, 6HP26A, 6HP26A61, 6HP26X",
    brand: "ZF",
    price: 1100,
    discount: 8,
    isAvailable: false,
  },
  {
    id: 1068298043,
    image: wheelHd,
    title: "Диск матовый R19 5x120 BMW X6 F16",
    type: "6HP26, 6HP26A, 6HP26A61, 6HP26X",
    brand: "ZF",
    price: 1300,
    discount: 18,
    isAvailable: true,
  }
]
