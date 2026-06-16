import { supabase } from "@/shared/api/supabase"

export const getProducts = async (count: number) => {
    return await supabase
    .from('products_view')
    .select('*')
    .eq('label->>variant', 'new')
    .limit(count); 
}
