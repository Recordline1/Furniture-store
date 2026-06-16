'use client';

import { useState, useEffect, use, } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutFormValues } from '../model/checkoutSchema';
import { useCartStore } from '@/entities/cart/model/useCartStore';
import { createOrder } from '../api/checkout';
import { sendTelegramMessage } from '../api/sendTelegramMessage';



export const CheckoutForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const { items, clearCart, getTotalPrice } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [isSuccess, router]);



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { deliveryMethod: '', payment: '' }
  });

  const deliveryMethod = watch('deliveryMethod');
  const isPickup = deliveryMethod === 'pickup';

  const onSubmit = async (data: CheckoutFormValues) => {
    try {

      await createOrder(data, items, getTotalPrice());
      sendTelegramMessage(data, items, getTotalPrice());
      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.');
    }
  };

  if (!isMounted) {
    return null;
  }

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto p-10 bg-white border border-gray-200 rounded-xl text-center shadow-sm mt-8">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <p className="text-xl font-medium mb-2">The order has been placed!</p>
        <p className="text-gray-500 text-sm">We will contact you shortly</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
      >

        <p className="text-sm font-medium text-gray-500 tracking-wider mb-4 uppercase">Contact Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600" htmlFor="fullName">Full Name</label>
            <input
              {...register('fullName')}
              id="fullName"
              placeholder="John Doe"
              className={`w-full bg-gray-50 border rounded-md px-3 py-2 text-sm outline-none transition-colors focus:border-gray-400 focus:ring-2 focus:ring-gray-100 ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
            />
            {errors.fullName && <span className="text-xs text-red-500 min-h-[16px]">{errors.fullName.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600" htmlFor="phone">Phone</label>
            <input
              {...register('phone')}
              id="phone"
              placeholder="+38 (0XX) XXX-XX-XX"
              className={`w-full bg-gray-50 border rounded-md px-3 py-2 text-sm outline-none transition-colors focus:border-gray-400 focus:ring-2 focus:ring-gray-100 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
            />
            {errors.phone && <span className="text-xs text-red-500 min-h-[16px]">{errors.phone.message}</span>}
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label className="text-sm text-gray-600" htmlFor="email">Email</label>
          <input
            {...register('email')}
            id="email"
            type="email"
            placeholder="example@mail.com"
            className={`w-full bg-gray-50 border rounded-md px-3 py-2 text-sm outline-none transition-colors focus:border-gray-400 focus:ring-2 focus:ring-gray-100 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
          />
          {errors.email && <span className="text-xs text-red-500 min-h-[16px]">{errors.email.message}</span>}
        </div>

        <hr className="border-gray-200 my-6" />

        <p className="text-sm font-medium text-gray-500 tracking-wider mb-4 uppercase">Delivery</p>
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm text-gray-600" htmlFor="deliveryMethod">Delivery Method</label>
          <select
            {...register('deliveryMethod')}
            id="deliveryMethod"
            className={`w-full bg-gray-50 border rounded-md px-3 py-2 text-sm outline-none transition-colors focus:border-gray-400 focus:ring-2 focus:ring-gray-100 ${errors.deliveryMethod ? 'border-red-500' : 'border-gray-200'}`}
          >
            <option value="">Choose a method</option>
            <option value="courier">Courier</option>
            <option value="nova">Nova Poshta</option>
            <option value="ukr">Ukrposhta</option>
            <option value="pickup">Pickup</option>
          </select>
          {errors.deliveryMethod && <span className="text-xs text-red-500 min-h-[16px]">{errors.deliveryMethod.message}</span>}
        </div>

        {!isPickup && (
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600" htmlFor="city">City</label>
              <input
                {...register('city')}
                id="city"
                placeholder="Kyiv"
                className={`w-full bg-gray-50 border rounded-md px-3 py-2 text-sm outline-none transition-colors focus:border-gray-400 focus:ring-2 focus:ring-gray-100 ${errors.city ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.city && <span className="text-xs text-red-500 min-h-[16px]">{errors.city.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600" htmlFor="address">Delivery Address</label>
              <input
                {...register('address')}
                id="address"
                placeholder="ul. Kreschatyk, d. 1, kv. 5"
                className={`w-full bg-gray-50 border rounded-md px-3 py-2 text-sm outline-none transition-colors focus:border-gray-400 focus:ring-2 focus:ring-gray-100 ${errors.address ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.address && <span className="text-xs text-red-500 min-h-[16px]">{errors.address.message}</span>}
            </div>
          </div>
        )}

        <hr className="border-gray-200 my-6" />

        <p className="text-sm font-medium text-gray-500 tracking-wider mb-4 uppercase">Payment</p>
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm text-gray-600" htmlFor="payment">Payment Method</label>
          <select
            {...register('payment')}
            id="payment"
            className={`w-full bg-gray-50 border rounded-md px-3 py-2 text-sm outline-none transition-colors focus:border-gray-400 focus:ring-2 focus:ring-gray-100 ${errors.payment ? 'border-red-500' : 'border-gray-200'}`}
          >
            <option value="">Choose a method</option>
            <option value="card">Online Card Payment</option>
            <option value="cash">Cash on Delivery</option>
            <option value="cod">Cash on Delivery</option>
          </select>
          {errors.payment && <span className="text-xs text-red-500 min-h-[16px]">{errors.payment.message}</span>}
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label className="text-sm text-gray-600" htmlFor="comment">Comment about the order</label>
          <textarea
            {...register('comment')}
            id="comment"
            placeholder="Wishes, delivery time, floor..."
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none transition-colors focus:border-gray-400 focus:ring-2 focus:ring-gray-100 min-h-[80px] resize-y"
          ></textarea>
        </div>

        <hr className="border-gray-200 my-6" />

        <p className="text-sm font-medium text-gray-500 tracking-wider mb-4 uppercase">Your Order</p>
        <div className="bg-gray-50 rounded-md p-4 mb-6">
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-sm text-gray-600 py-1">
              <span>{item.name} × {item.quantity}</span>
              <span>Rs. {item.price.toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm text-gray-600 py-1">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 pt-3 mt-2 border-t border-gray-200">
            <span>Total</span>
            <span>Rs. {getTotalPrice().toLocaleString()}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className=" bg-black w-full text-white rounded-md px-5 py-3 font-medium transition-opacity hover:opacity-85 active:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};