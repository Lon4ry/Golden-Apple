"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import { ArrowLeft } from "lucide-react";
import { OrderSkeleton } from "@/shared/ui/skeletons";
import BadgeDeliver from "@/shared/ui/badge-deliver";
import { useAuth } from "@/app/layouts";

export default function BuyCartsOrderPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrders] = useState();

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `/api/buy-carts/buy-carts-order/${params.id}/order`,
            );
            const data = await response.json();

            if (data) {
                setOrders(data);
                setIsLoading(false);
            }
        })();
    }, [user]);

    if (!isLoading && !(user.role == "SALES_MANAGER")) router.replace("/");

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <OrderSkeleton />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button
                variant="outline"
                className="mb-6"
                onClick={() => router.back()}
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Назад
            </Button>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>
                            Детали заказа - {order.orderDetails.id}
                        </CardTitle>
                        <BadgeDeliver status={order.orderDetails.status} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <h3 className="mb-2 text-lg font-semibold">
                                Информация о заказчике
                            </h3>
                            <p>
                                {" "}
                                {order.user.name} {order.user.lastName}
                            </p>
                            <p>Электронная почта {order.user.email}</p>
                            <p>
                                Номер телефона{" "}
                                {order.user.phone
                                    ? order.user.phone
                                    : "Не указан"}
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 text-lg font-semibold">
                                Адрес заказчика
                            </h3>
                            <p>{order.user.address}</p>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <h3 className="mb-4 text-lg font-semibold">
                        Товары в заказе
                    </h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Наиминование</TableHead>
                                <TableHead>Количество</TableHead>
                                <TableHead>Цена</TableHead>
                                <TableHead>Сумма</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.orderDetails.orderItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        {item.price.toFixed(2)}₽
                                    </TableCell>
                                    <TableCell>
                                        {(item.quantity * item.price).toFixed(
                                            2,
                                        )}
                                        ₽
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="mt-6 text-right">
                        <p className="text-lg font-semibold">
                            Сумма заказа: {order.orderDetails.total.toFixed(2)}₽
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
