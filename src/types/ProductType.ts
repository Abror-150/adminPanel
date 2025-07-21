export interface ProductType {
  categoryId: string;
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
