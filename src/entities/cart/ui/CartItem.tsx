'use client';

import Image from 'next/image';
import {FurnitureProduct} from '@shared/types/index';
import { CloseIcon } from '@shared/icons/CloseIcon';

interface CartItemProps {
  item:FurnitureProduct; 
  onAdd: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartItem = ({ item, onAdd, onDecrease, onRemove }: CartItemProps) => {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <Image 
          src={item.image_url} 
          alt={item.name} 
          fill 
          className="object-cover" 
          sizes="80px"
        />
      </div>

      <div className="flex gap-2 flex-wrap flex-grow">
          <div className="flex-grow">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">Rs. {item.price.toLocaleString()}</p>
            <p className="text-sm font-semibold text-gray-900">
              Rs. {(item.price * item.quantity).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onDecrease}
              className="flex h-8 w-8 items-center justify-center rounded-xl border hover:bg-gray-50 transition cursor-pointer"
            >
              −
            </button>
            <span className="w-6 text-center font-bold text-gray-900">{item.quantity}</span>
            <button
              onClick={onAdd}
              className="flex h-8 w-8 items-center justify-center rounded-xl border hover:bg-gray-50 transition cursor-pointer"
            >
              +
            </button>
          </div>
      </div>

      <button
        onClick={onRemove}
        className="shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <CloseIcon width={16} height={16} />
      </button>
    </div>
  );
};