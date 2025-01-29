import "@/app/globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./auth-context";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "ElectroTools",
    description: "Your one-stop shop for electronic tools",
};

export function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
