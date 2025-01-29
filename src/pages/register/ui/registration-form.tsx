"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/app/layouts";

export default function RegistrationForm() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, lastName, email, password }),
            });

            if (response.ok) {
                // Log the user in after successful registration
                const success = await login(email, password);
                if (success) {
                    router.push("/cabinet");
                } else {
                    setError(
                        "Registration successful, but unable to log in. Please try logging in manually.",
                    );
                }
            } else {
                const data = await response.json();
                setError(data.error || "Registration failed");
            }
        } catch (error) {
            setError("An error occurred during registration");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-lg bg-white p-6 shadow"
        >
            <h2 className="mb-4 text-2xl font-bold">Регистрация</h2>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="mb-2 block font-bold text-gray-700"
                >
                    Имя
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="lastName"
                    className="mb-2 block font-bold text-gray-700"
                >
                    Фамилия
                </label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2"
                    required
                />
            </div>
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
                Зарегистрироваться
            </button>
        </form>
    );
}
