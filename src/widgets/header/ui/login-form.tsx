"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await signIn("credentials", { email, password });
        if (success) {
            router.push("/cabinet/personal");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto space-y-8 bg-white p-6"
        >
            <h2 className="text-3xl font-bold">Авторизация</h2>
            <div className="space-y-4">
                <label
                    htmlFor="email"
                    className="block text-lg font-bold text-gray-700"
                >
                    Электронная почта
                </label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2"
                    required
                />
            </div>
            <div className="space-y-4">
                <label
                    htmlFor="password"
                    className="block text-lg font-bold text-gray-700"
                >
                    Пароль
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full cursor-pointer rounded bg-[#FFB800] px-4 py-2 text-black hover:bg-[#E5A600]"
            >
                Войти
            </button>
        </form>
    );
}
