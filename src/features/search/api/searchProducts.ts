"use server";

import {createClient} from '@shared/api/server';

export async function searchProducts(query: string) {
  if (!query) return [];
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('slug, name, price, image_url') 
    .ilike('name', `%${query}%`)
    .limit(5);

  return data || [];
}