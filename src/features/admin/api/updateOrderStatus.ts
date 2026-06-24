'use server'

import { createClient } from '@shared/api/server';

export async function updateOrderStatus(orderId: string, newStatus: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (error) return { error: error.message };
  
  return { success: true };
}