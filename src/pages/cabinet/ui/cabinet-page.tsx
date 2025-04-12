"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Separator } from "@/shared/ui/separator";
import { CreditCard, Package } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useAuth } from "@/app/layouts";
import CabinetSkeleton from "@/pages/cabinet/ui/cabinet-skeleton";
import OrdersList from "@/pages/cabinet/ui/orders";
import AddressForm from "@/pages/cabinet/ui/addressForm";
import ChangeUserInfoForm from "@/pages/cabinet/ui/changeUserInfoForm";
import { useParams } from "next/navigation";

export function ProfilePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState();
    const params = useParams();
    const [orderTotal, setOrderTotal] = useState();

    const { user } = useAuth();
    useEffect(() => {
        (async () => {
            const response = await fetch(
                `/api/orders/get-order/${user?.id}/orders`,
            );
            const data = await response.json();
            const ordersTotal = data.reduce(
                (total, orders) => total + orders.orderTotal,
                0,
            );
            setOrderTotal(ordersTotal);
            setOrders(data);
            if (user && Array.isArray(data)) setIsLoading(false);
        })();
    }, [user]);

    if (isLoading) {
        return <CabinetSkeleton />;
    } else {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-6 md:flex-row md:gap-10">
                    <aside className="w-full md:w-1/4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center">
                                    <Avatar className="mb-4 h-24 w-24">
                                        <AvatarImage
                                            src="/placeholder.svg"
                                            alt="User"
                                        />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-bold">
                                        {user?.name}
                                    </h2>
                                    <p className="text-muted-foreground text-sm">
                                        {user?.email}
                                    </p>
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Всего заказов
                                            </CardTitle>
                                            <Package className="text-muted-foreground h-4 w-4" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {orders.length
                                                    ? orders.length
                                                    : "Пока что нету"}
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Товаров куплено на{" "}
                                            </CardTitle>
                                            <CreditCard className="text-muted-foreground h-4 w-4" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {orderTotal
                                                    ? orderTotal + "₽"
                                                    : "Пока что нету"}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    <main className="flex-1">
                        <Tabs defaultValue={"personal"} className="space-y-4">
                            <TabsList>
                                <TabsTrigger
                                    className="text-lg"
                                    value="personal"
                                >
                                    Персональная информация
                                </TabsTrigger>
                                <TabsTrigger className="text-lg" value="orders">
                                    Заказы
                                </TabsTrigger>
                                <TabsTrigger
                                    className="text-lg"
                                    value="addresses"
                                >
                                    Адресы
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="personal">
                                <ChangeUserInfoForm user={user} />
                            </TabsContent>

                            <TabsContent value="orders">
                                <OrdersList ordersDefault={orders} />
                            </TabsContent>

                            <TabsContent value="addresses">
                                <AddressForm user={user} />
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            </div>
        );
    }
}
