"use client";
import Layout from "@/app/layouts/layout";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/ui/carousel";
import { useEffect, useState } from "react";
import type { Product } from "@/db/schema";
import { ProductCard } from "@/entities/product";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("/api/products");
            const data = await response.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);
    return (
        <Layout>
            <div className="space-y-8">
                <Carousel className="mx-auto w-8/12">
                    <CarouselContent>
                        <CarouselItem className="relative">
                            <img
                                src="/main.jpg"
                                className="h-96 w-full"
                                alt=""
                            />
                            <div className="p-1">
                                <div className="bg-opacity-50 absolute inset-0 flex flex-col items-center justify-center bg-black p-4 text-center text-white">
                                    <h2 className="mb-2 text-2xl font-bold md:text-4xl">
                                        У нас новые товары!
                                    </h2>
                                    <p className="mb-4 text-sm md:text-lg">
                                        Новые товары уже доступны в каталоге
                                    </p>
                                    <Button
                                        asChild
                                        className="bg-[#FFB800] text-black hover:bg-[#E5A600]"
                                    >
                                        <Link href="/products">
                                            Смотреть продукты
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CarouselItem>

                        <CarouselItem className="relative">
                            <img
                                src="/main2.png"
                                className="h-96 w-full"
                                alt=""
                            />
                            <div className="p-1">
                                <div className="bg-opacity-50 absolute inset-0 flex flex-col items-center justify-center bg-black p-4 text-center text-white">
                                    <h2 className="mb-2 text-2xl font-bold md:text-4xl">
                                        Скоро скидки!
                                    </h2>
                                    <p className="mb-4 text-sm md:text-lg">
                                        Скоро весенние скидки
                                    </p>
                                    <Button
                                        asChild
                                        className="bg-[#FFB800] text-black hover:bg-[#E5A600]"
                                    >
                                        <Link href="/products">
                                            Смотреть продукты
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                <section>
                    <h2 className="mb-4 text-2xl font-bold"> Товары</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
