"use client";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { useAuth } from "@/app/layouts/auth-context";
import { cn } from "@/shared/utils/utils";
import { Check, Heart, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui";
import { useState } from "react";
import { toast } from "sonner";

type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
    description: string;
};

export function ProductCard({
    product,
    className,
}: {
    product: Product;
    className?: string;
}) {
    const { user } = useAuth();
    const [isAddToCartDialogOpen, setIsAddToCartDialogOpen] = useState(false);
    const addToCart = async (e) => {
        e.preventDefault();
        if (!user) {
            setIsAddToCartDialogOpen(true);

            return;
        }
        await fetch(`/api/cart/set-cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([user.id, product]),
        });

        toast(
            <div>
                <span className="text-lg">
                    {" "}
                    <Check className="mr-2 inline" />
                    Товар добавлен в корзину
                </span>
            </div>,
        );
    };

    return (
        <Card
            className={cn(
                "group border-none bg-transparent shadow-none duration-300",
                className,
            )}
        >
            <Link href={`/products/${product.id}`}>
                <CardHeader className="relative p-0">
                    <Heart className="= hover:bg-foreground-[#c6b09f] absolute top-6 right-4 h-8 w-8 cursor-pointer rounded-full opacity-70 duration-300 group-hover:opacity-100" />

                    <img
                        src={
                            product.image
                                ? product.image
                                : `/placeholder.svg?height=200&width=200&text=${product.name}`
                        }
                        alt={product.name}
                        className="mb-4 h-74 w-full rounded object-cover"
                    />
                    <Button
                        variant="addCart"
                        size="icon"
                        className="absolute right-4 bottom-6 cursor-pointer rounded-full p-6"
                        onClick={addToCart}
                    >
                        <ShoppingBasket className="opacity-0 duration-300 group-hover:opacity-100" />
                    </Button>
                </CardHeader>
                <CardContent className="flex flex-col items-end space-y-4 p-0">
                    <Badge variant="addCart" className="mb-4 lg:text-lg">
                        {product.category}
                    </Badge>
                    <CardTitle className="line-camp-2 text-right duration-300 group-hover:text-[#c6b09f] lg:text-2xl">
                        {product.name}
                    </CardTitle>

                    <p className="text-right text-lg font-bold duration-300 group-hover:text-[#c6b09f] md:text-xl">
                        {product.price.toFixed(2)} ₽
                    </p>
                </CardContent>
            </Link>
            <Dialog
                open={isAddToCartDialogOpen}
                onOpenChange={setIsAddToCartDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Авторизуйтесь чтобы добавить товар в корзину!
                        </DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
