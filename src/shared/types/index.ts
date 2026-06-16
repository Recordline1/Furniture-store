export interface FurnitureProduct {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image_url: string;
  slug: string;
  description?: string;
  category: string;
  quantity: number;
  label?: {
    text: string;
    variant: 'new' | 'sale' | 'hot';
  };
}