export interface FurnitureProduct {
  id: string;
  name: string;
  price: number;
  old_price?: number;
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