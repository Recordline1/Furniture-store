import { supabase } from "@/shared/api/supabase";
import { Post } from '@entities/post-card/model/interface';


export const getPosts = async () => {
    return await supabase
        .from('posts')
        .select('*')
        .limit(3)
}