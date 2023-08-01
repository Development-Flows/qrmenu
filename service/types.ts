export type Response_getAllWithProduct = {
  status: boolean;
  error: any;
  data: {
    _id: string;
    name: string;
    badge: {
      icon: string;
      text: string;
    };
    description: string;
    products: {
      _id: string;
      badge: { icon: string; text: string };
      name: string;
      description: string;
      stock: number;
      unit: string;
      image: string;
      priceSale: number;
      isActive: boolean;
      menuIds: string[];
      sort: number;
      brand: string;
      recordTime: number;
    }[];
  }[];
};
