export interface IPlace {
  id: number;
  name: string;
  imageUrl?: string;
  address?: string;
  slug: string;
  category?: string;
  tags?: string[];
}

export interface IProduct {
  name: string;
  description?: string;
  price: string;
  oldPrice?: string;
  quantity: string;
  category?: string;
  imageUrl?: string;
}

export interface IPlacePrice {
  slug: string;
  name: string;
  products?: IProduct[];
}
