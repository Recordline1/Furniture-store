'use client';

import { Container } from "@/shared/Container";
import { useActionState } from 'react';
import { Logo } from "@/shared/icons/Logo";
import { login, AuthState } from "./actions";

export default function AuthPage() {
    const initialState: AuthState = { error: null };

    const [state, formAction, isPending] = useActionState(login, initialState);
    return (
        <main >
            <Container className="flex align-center justify-center flex-col h-lvh">
                <h1 className="flex justify-center mb-4"><Logo width={70} height={50} /></h1>
                <form action={formAction} className="max-w-md w-full mx-auto grid gap-3">
                    <InputField name="email" type="text" placeholder="Phone number or Email address" />
                    <InputField name="password" type="password" placeholder="Enter your password" />
                    {state?.error && (
                        <p className="text-red-500 text-sm my-3">{state.error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={isPending} 
                        className="bg-black text-white p-4 rounded-full disabled:bg-gray-400"
                    >
                        {isPending ? 'Logging in...' : 'Login'}
                    </button>
                    <div>
                        <p className="flex justify-between gap-4"><a className="text-blue-500 hover:underline" href="">Forgot password ?</a> <a href="/reg" className="text-blue-500 hover:underline">Register now</a></p>
                    </div>
                </form>
                <div className="flex items-center justify-center mt-1">
                    <a className="text-gray-500 hover:underline" href="">log in with Google</a>
                </div>
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