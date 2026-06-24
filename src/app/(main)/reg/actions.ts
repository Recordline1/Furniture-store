'use server'

import { createClient } from '@/shared/api/server';



export type AuthState = {
    error: string | null;
    success: string | null
};


export async function register(prevState: any, formData: FormData): Promise<AuthState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
        email,
        password,
        // options: {
        //     emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        // },
    });

    if (error) {
        return { error: error.message, success: null };
    }

    return { error: null, success: "Thank you for registration" };
}