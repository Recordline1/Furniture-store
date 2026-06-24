'use server'

import { createClient } from '@/shared/api/server';
import { redirect } from 'next/navigation';

export type AuthState = {
    error: string | null;
};

export async function login(prevState: any, formData: FormData): Promise<AuthState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,   
    });

    if (error) {
        return { error: error.message };
    }

    redirect('/profile');
}