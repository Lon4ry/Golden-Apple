"use client";
import { Suspense, useEffect, useState } from "react";
import type { Product } from "@/db/schema";
import SectionTittle from "@/shared/ui/section-tittle";
import NewProductsCarousel from "@/pages/home/ui/new-products-carousel";
import { Loader } from "lucide-react";
import FullscreenCarousel from "@/pages/home/ui/fullscreen-carousel";

export function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        (async function fetchProducts() {
            const response = await fetch("/api/products/get-all");
            const data = await response.json();
            setProducts(data);
        })();
    }, []);
    return (
        <div className="relative space-y-8 lg:-top-33">
            <FullscreenCarousel />
            <section className="container mx-auto">
                <SectionTittle>Новинки</SectionTittle>
                <Suspense fallback={<Loader />}>
                    <NewProductsCarousel products={products} />
                </Suspense>
            </section>
        </div>
    );
}
