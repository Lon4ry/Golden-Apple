"use client";

import { useEffect, useState } from "react";

import { Button } from "@/shared/ui/button";
import { Frown, Minus, Plus, Trash2 } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shared/ui/sheet";
import { useMediaQuery } from "@/shared/hooks";
import { useAuth } from "@/app/layouts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CartPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    useEffect(() => {
        (async function fetchProducts() {
            if (user) {
                const response = await fetch(
                    `/api/cart/get-cart/${user.id}/cart`,
                );
                const data = await response.json();
                setCart(data);
            }
        })();
    }, [user]);

    const isMobile = useMediaQuery("(max-width: 640px)");
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    function updateQuantity(id, variant: string): void {
        const cartItemQuantity = cart.find((item) => item.orderItem.id == id);

        cartItemQuantity.orderItem.quantity =
            variant == "plus"
                ? cartItemQuantity.orderItem.quantity + 1
                : cartItemQuantity.orderItem.quantity - 1;

        fetch(`/api/cart/change-cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([id, cartItemQuantity.orderItem.quantity]),
        });

        const cartNew = cart.slice(0);

        cart.forEach((item) => {
            item.orderItem.id == item.id
                ? item.orderItem.quantity == cartItemQuantity.orderItem.quantity
                : false;
        });
        setCart(cartNew);
    }

    function deleteCart(id: string) {
        fetch(`/api/cart/delete-cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(id),
        });
        const cartItemIndex = cart.findIndex((item) => item.orderItem.id == id);
        let cartNew = cart.splice(0);
        cartNew.splice(cartItemIndex, 1);
        setCart(cartNew);
    }
    function createOrder() {
        if (user.address) {
            const cartItemsId = cart.map((item) => item.orderItem.id);
            const cartProductsId = cart.map((item) => item.product.id);
            fetch(`/api/orders/set-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([user.id, cartProductsId, cartItemsId]),
            });
            router.push("/cabinet");
        }

        setIsDialogOpen(true);
    }
    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.orderItem.quantity,
        0,
    );

    const CartContent = () => (
        <div className="space-y-4">
            {cart?.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                >
                    <div className="flex items-center space-x-4">
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-20 w-20 rounded object-cover"
                        />
                        <div>
                            <h3 className="font-semibold">
                                {item.product.name}
                            </h3>
                            <p className="text-gray-600">
                                {item.product.price.toFixed(2)}₽
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center space-x-4">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 shrink-0 cursor-pointer rounded-full p-4"
                                onClick={() =>
                                    updateQuantity(item.orderItem.id, "minus")
                                }
                                disabled={item.orderItem.quantity <= 1}
                            >
                                <Minus />
                                <span className="sr-only">Decrease</span>
                            </Button>
                            <div className="flex-1 text-center">
                                <div className="text-xl font-bold tracking-tighter">
                                    {item.orderItem.quantity}
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shink-0 h-7 w-7 cursor-pointer rounded-full p-4"
                                onClick={() =>
                                    updateQuantity(item.orderItem.id, "plus")
                                }
                                disabled={item.orderItem.quantity >= 10}
                            >
                                <Plus />
                                <span className="sr-only">Increase</span>
                            </Button>
                        </div>
                        <Button
                            variant="destructive"
                            onClick={() => deleteCart(item.orderItem.id)}
                            size="icon"
                            className="cursor-pointer p-4"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            {user.address
                                ? "Ваш заказ оформлен"
                                : "Для оформления заказа требуется указать адрес"}
                        </DialogTitle>
                        <DialogDescription className="text-lg">
                            {user.address
                                ? "Можете посмотреть в личном кабинете"
                                : "Укажите адрес в личном кабинете"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4"></div>
                    <DialogFooter>
                        {user.address ? (
                            <div className="flex w-full justify-end space-x-3">
                                <Button onClick={() => setIsDialogOpen(false)}>
                                    Закрыть
                                </Button>
                                <Button>
                                    <Link href="/cabinet">
                                        {" "}
                                        Перейти в личный кабинет
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <Button>
                                <Link href="/cabinet">
                                    {" "}
                                    Перейти в личный кабинет
                                </Link>
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex items-center justify-between pt-4">
                <p className="text-4xl font-semibold">Сумма:</p>
                <p className="text-2xl font-bold">{total.toFixed(2)}₽</p>
            </div>
            <Button
                onClick={createOrder}
                size="lg"
                className="w-full cursor-pointer text-xl"
            >
                Оформить заказ
            </Button>
        </div>
    );

    return (
        <div className="px-5">
            <h2 className="mb-6 text-3xl font-bold">Ваша корзина</h2>
            {cart.length === 0 ? (
                <div className="flex items-center justify-center space-x-2 py-10">
                    <p className="align-center text-2xl font-bold lg:text-3xl">
                        Ваша корзина пуста
                    </p>{" "}
                    <Frown />
                </div>
            ) : isMobile ? (
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button>Посмотреть корзину</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Ваша корзина</SheetTitle>
                            <SheetDescription>
                                Посмотрите что вы добавили в корзину
                            </SheetDescription>
                        </SheetHeader>
                        <CartContent />
                    </SheetContent>
                </Sheet>
            ) : (
                <CartContent />
            )}
        </div>
    );
}
