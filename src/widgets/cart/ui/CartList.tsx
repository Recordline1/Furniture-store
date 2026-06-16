'use client';

import { useCartStore } from '@/entities/cart/model/useCartStore';
import { CloseIcon } from '@shared/icons/CloseIcon';
import {CartItem} from '@entities/cart/ui/CartItem';
import Image from 'next/image';
import Link from 'next/link';

export const CartList = () => {
  const { items, addItem, decreaseItem, removeItem, clearCart, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return <p className="text-center py-10 text-gray-500">Your cart is empty</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {items.map((item) => (
        <CartItem key={item.id} item={item} onAdd={() => addItem(item)} onDecrease={() => decreaseItem(item.id)} onRemove={() => removeItem(item.id)}/>
      ))}

      <div className="flex justify-between items-center text-xl font-bold pt-4">
        <span>Total:</span>
        <span>Rs. {getTotalPrice().toLocaleString()}</span>
      </div>
      <Link href="/checkout" className="self-end bg-black text-white rounded-md px-6 py-3 font-medium transition-opacity hover:opacity-85 active:opacity-70">
        Proceed to Checkout
      </Link>
      <button
        onClick={clearCart}
        className="self-end text-sm text-gray-400 hover:text-red-500 hover:underline transition-colors"
      >
        Clear cart
      </button>
    </div>
  );
};