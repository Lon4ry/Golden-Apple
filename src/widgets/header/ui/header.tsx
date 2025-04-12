"use client";

import Link from "next/link";
import { useAuth } from "@/app/layouts/auth-context";

import { Heart, LogOut, UserRound } from "lucide-react";
import { AuthWidget, CartWidget } from "@/widgets/header/ui/";

export function Header(variant: { variant?: string }) {
    const { user, logout } = useAuth();
    console.log(user);
    return (
        <header
            className={
                variant.variant == "home"
                    ? "relative z-50 border-b-1 bg-transparent duration-700 hover:bg-white"
                    : "bg-white shadow"
            }
        >
            <nav className="container mx-auto flex items-center justify-between px-4 py-2 pt-4">
                <Link href="/" className="text-3xl font-bold">
                    Golden Apple
                </Link>
                <div className="flex items-center space-x-12">
                    {user ? (
                        <>
                            <Link href="/cabinet">
                                <UserRound className="h-8 w-8 cursor-pointer" />
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
                                    <Link href="/cabinet">
                                        <Heart className="h-8 w-8 cursor-pointer" />
                                    </Link>
                                    <CartWidget authorize={true} />
                                    <Link
                                        href="/support"
                                        className="text-lg text-black hover:text-gray-600"
                                    >
                                        Поддержка
                                    </Link>
                                </>
                            )}
                            <LogOut
                                onClick={logout}
                                className="h-8 w-8 cursor-pointer"
                            />
                        </>
                    ) : (
                        <>
                            <Link href="/cabinet/favorites">
                                <Heart className="h-8 w-8 cursor-pointer" />
                            </Link>
                            <CartWidget authorize={false} />
                            <AuthWidget />
                        </>
                    )}
                </div>
            </nav>
            <nav className="center container mx-auto flex items-center justify-center space-x-4 px-4 py-2 pb-4">
                <Link
                    href="/products"
                    className="text-lg text-black hover:text-gray-600"
                >
                    Женское
                </Link>
                <Link
                    href="/products"
                    className="text-lg text-black hover:text-gray-600"
                >
                    Мужское
                </Link>{" "}
                <Link
                    href="/products"
                    className="text-lg text-black hover:text-gray-600"
                >
                    Духи
                </Link>
            </nav>
        </header>
    );
}
