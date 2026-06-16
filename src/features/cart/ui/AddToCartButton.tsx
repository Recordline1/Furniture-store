"use client";

import { useCartStore } from '@/entities/cart/model/useCartStore';
import { FurnitureProduct } from '@/shared/types';

export const AddToCartButton = ({ product }: { product: FurnitureProduct }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button 
      onClick={() => addItem(product)}
      className="w-full  rounded border border-gray-900 px-4 py-2 text-sm tracking-wide font-medium hover:bg-gray-900 hover:text-white transition-colors cursor-pointer"
    >
      Add to Cart
    </button>
  );
};