"use client";

import Link from "next/link";
import { useAuth } from "@/app/layouts/auth-context";

export function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow">
            <nav className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/" className="text-2xl font-bold">
                    ElectroTools
                </Link>
                <div className="space-x-4">
                    <Link
                        href="/products"
                        className="text-lg text-black hover:text-gray-600"
                    >
                        Продукты
                    </Link>
                    {user ? (
                        <>
                            <Link
                                href="/cabinet"
                                className="text-lg text-black hover:text-gray-600"
                            >
                                Профиль
                            </Link>
                            {user.role === "CEO" ||
                            user.role === "SALES_MANAGER" ? (
                                <Link
                                    href="/buy-carts"
                                    className="text-lg text-black hover:text-gray-600"
                                >
                                    Заказы пользователей
                                </Link>
                            ) : user.role === "CEO" ||
                              user.role === "STORAGE_MANAGER" ? (
                                <Link
                                    href="/products/admin"
                                    className="text-lg text-black hover:text-gray-600"
                                >
                                    Управление продуктами
                                </Link>
                            ) : (
                                <>
                                    {" "}
                                    <Link
                                        href="/cart"
                                        className="text-lg text-black hover:text-gray-600"
                                    >
                                        Корзина
                                    </Link>
                                    <Link
                                        href="/support"
                                        className="text-lg text-black hover:text-gray-600"
                                    >
                                        Поддержка
                                    </Link>
                                </>
                            )}
                            <button
                                onClick={logout}
                                className="text-lg text-black hover:text-gray-600"
                            >
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-lg text-black hover:text-gray-600"
                            >
                                Войти
                            </Link>
                            <Link
                                href="/register"
                                className="text-lg text-black hover:text-gray-600"
                            >
                                Зарегистрироваться
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
