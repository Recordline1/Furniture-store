import { supabase } from "@/shared/api/supabase"

export const getTopProducts = async (count: number) => {
    return await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(count); 
}
