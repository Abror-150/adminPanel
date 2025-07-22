export interface ProductType {
  depth: number;
  discountedPrice: 10000;
  frame_en?: string;
  frame_ru: string;
  frame_uz?: string;
  id: number;
  image: string;
  price: number;
  quantity: number;
  size: string;
  Category: {
    id: string;
    name: string;
  };
}

export interface CreateProductType {
  categoryId: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  depth: number;
  discountedPrice: number;
  frame_en?: string;
  frame_uz?: string;
  frame_ru: string;
}
