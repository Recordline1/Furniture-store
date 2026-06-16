
import { supabase } from '@/shared/api/supabase';
import { CheckoutFormValues } from '../model/checkoutSchema'; 

export const createOrder = async (
  customerData: CheckoutFormValues, 
  cartItems: any[],                 
  totalPrice: number                
) => {
  
  
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{ 
      total_price: totalPrice,
      status: 'pending',
      
      customer_name: customerData.fullName,
      customer_phone: customerData.phone,
      customer_email: customerData.email,
      delivery_method: customerData.deliveryMethod,
      payment_method: customerData.payment,
      shipping_address: customerData.address || null,
      city: customerData.city || null,
      comment: customerData.comment || null
    }])
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.id, 
    quantity: item.quantity,
    price_at_purchase: item.price
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;
  
  return order;
};