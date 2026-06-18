'use server'

import { createClient } from '@shared/api/server'; 
import { checkoutSchema, CheckoutFormValues } from '../model/checkoutSchema';

export async function placeOrderAction(data: CheckoutFormValues, items: any[]) {
  const result = checkoutSchema.safeParse(data);
  if (!result.success) return { error: 'Invalid data' };

  const supabase = await createClient();

const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const { data: order, error } = await supabase
    .from('orders')
    .insert([
      {
        total_price: total,
        status: data.payment === 'card' ? 'pending_payment' : 'new',
        customer_name: data.fullName,
        customer_phone: data.phone,
        customer_email: data.email,
        delivery_method: data.deliveryMethod,
        payment_method: data.payment,
        shipping_address: data.address || null,
        city: data.city || null,
        comment: data.comment || null,       
      }
    ])
    .select()
    .single();

  if (error) return { error: error.message };

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price_at_purchase: item.price,
  }));

  const { error: orderItemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (orderItemsError) return { error: orderItemsError.message };
  

  return { success: true, orderId: order.id };
}