import { supabase } from "@/shared/api/supabase";


export const getNewArrivals = async (product: string) => {
    return await supabase
        .from('products')
        .select('*')
        .eq('slug', product)
        .single();
}