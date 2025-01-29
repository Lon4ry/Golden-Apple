"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/src/app/layouts";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            router.push("/cabinet");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto rounded-lg bg-white p-6 shadow lg:w-4/12"
        >
            <h2 className="mb-4 text-2xl font-bold">Авторизация</h2>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="mb-2 block font-bold text-gray-700"
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
            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="mb-2 block font-bold text-gray-700"
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
                className="w-full rounded bg-[#FFB800] px-4 py-2 text-black hover:bg-[#E5A600]"
            >
                Войти
            </button>
            <p className="mt-4 text-center">
                У вас нету аккаунта?{" "}
                <Link
                    href="/register"
                    className="text-blue-500 hover:underline"
                >
                    Зарегистрироваться здесь
                </Link>
            </p>
        </form>
    );
}
