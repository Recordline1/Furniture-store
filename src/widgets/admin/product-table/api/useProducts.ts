// entities/product/api/useProducts.ts
'use client'

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@shared/api/supabase';
import {FurnitureProduct as  Product } from '@shared/types/index';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Product[];
    }
  });
};