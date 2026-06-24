'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@shared/api/supabase";

export const useOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select(`*,order_items(quantity,
                 price_at_purchase,
                 products (name))`);

            if (error) throw error;
            return data;
        },
    });
};