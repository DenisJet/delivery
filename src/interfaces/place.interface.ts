export interface IPlace {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string;
  address?: string;
  category?: string;
  tags?: string[];
}

export interface IProduct {
  name: string;
  price: string;
  quantity: string;
  storeName: string;
  oldPrice?: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  tags?: string[];
}

export interface IPlacePrice {
  slug: string;
  name: string;
  category: string;
  address?: string;
  description?: string;
  products?: IProduct[];
}
