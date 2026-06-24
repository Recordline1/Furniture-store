'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { register, AuthState } from './actions';
import { Container } from "@/shared/Container";

export default function RegisterPage() {

    const initialState: AuthState = { error: null, success: null };
    const [state, formAction, isPending] = useActionState(register, initialState);
    const router = useRouter();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (state?.success) {
            timer = setTimeout(() => {
                router.push('/auth');
            }, 2000);
        }

        return () => clearTimeout(timer);
    }, [state?.success, router]);

    return (
        <main>
            <Container className="flex align-center justify-center flex-col h-lvh">
                <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>

                <form action={formAction} className="max-w-md w-full mx-auto grid gap-3">
                    <InputField name="email" type="email" placeholder="phone number or Email" />
                    <InputField name="password" type="password" placeholder="Password" />

                    {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                    {state?.success && <p className="text-green-600 text-sm">{state.success}</p>}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="h-12 rounded-full bg-black text-white font-semibold uppercase tracking-[0.16em]"
                    >
                        {isPending ? 'Registering...' : 'Register'}
                    </button>

                    <p className="text-center text-sm">
                        Already have an account? <a href="/auth" className="text-blue-500 hover:underline">Login</a>
                    </p>
                </form>
            </Container>
        </main>
    );
}


type InputFieldProps = {
    label?: string;
    name: string;
    type?: string
    placeholder: string;
};

const InputField = ({ label, placeholder, name, type }: InputFieldProps) => (
    <div>
        {label && <label className="block text-sm font-medium mb-2">{label}</label>}
        <input required name={name} type={type} className="w-full p-4 border rounded-xl" placeholder={placeholder} />
    </div>
);