"use client";
import type React from "react";
import { Header } from "@/widgets/header";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathName = usePathname();

    return (
        <div className="min-h-screen bg-gray-100">
            <Header variant={pathName == "/" ? "home" : ""} />
            <main
                className={pathName == "/" ? "" : "container mx-auto px-4 py-8"}
            >
                {children}
                <Toaster />
            </main>
        </div>
    );
}
