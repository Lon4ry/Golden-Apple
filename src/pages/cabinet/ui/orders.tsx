import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui";
import DeliverBadge from "@/shared/ui/badge-deliver";
import { Frown, Package, RussianRuble } from "lucide-react";
import {
    approveDeliver,
    deniedDeliver,
} from "@/pages/cabinet/api/changeStatus";
import { useState } from "react";
import { OrderItem } from "@/db/schema";

export default function OrdersList({ ordersDefault }: { orders: OrderItem[] }) {
    const [orders, setOrders] = useState(ordersDefault);
    function changeReRenderDeliver(variant, orderId) {
        const newOrders = orders.splice(0);
        newOrders.forEach(
            (order) =>
                (order.status = order.id == orderId ? variant : order.status),
        );
        if (variant == "DELIVERED") {
            approveDeliver(orderId);
        } else {
            deniedDeliver(orderId);
        }

        setOrders(newOrders);
    }

    function getDate(str) {
        const date = new Date(str);
        const options = {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        };
        return date.toLocaleString("ru", options);
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Заказы</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {orders.length >= 1 ? (
                        orders.map((order: orderItem) => (
                            <div
                                key={order.id}
                                className="rounded-lg border p-4"
                            >
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <p className="font-semibold">
                                            Заказ #{order.id.slice(0, 5)}
                                        </p>
                                        <p className="text-muted-foreground text-sm">
                                            Заказ от {getDate(order.createdAt)}
                                        </p>
                                    </div>
                                    <DeliverBadge status={order.status} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Package className="text-muted-foreground h-8 w-8" />
                                    <div>
                                        <p className="font-medium">
                                            {order.orderItems[0].name} +{" "}
                                            {order.orderItems.length - 1} других
                                            товара
                                        </p>
                                        <p className="text-muted-foreground text-sm">
                                            Сумма заказа: {order.total}
                                            <RussianRuble className="inline size-4" />
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                Подробнее
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl">
                                                    Заказ #
                                                    {order.id.slice(0, 5)}
                                                </DialogTitle>
                                                <DialogDescription className="text-lg">
                                                    Заказ от{" "}
                                                    {getDate(order.createdAt)}
                                                </DialogDescription>
                                                <DeliverBadge
                                                    status={order.status}
                                                />
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                {order.orderItems.map(
                                                    (orderItem) => (
                                                        <div
                                                            key={orderItem.id}
                                                            className="flex items-center justify-between border-b pb-4"
                                                        >
                                                            <div className="flex items-center space-x-4">
                                                                <img
                                                                    src={`/placeholder.svg?height=80&width=80&text=${orderItem.name}`}
                                                                    alt={
                                                                        orderItem.name
                                                                    }
                                                                    className="h-20 w-20 rounded object-cover"
                                                                />
                                                                <div>
                                                                    <h3 className="font-semibold">
                                                                        {
                                                                            orderItem.name
                                                                        }
                                                                    </h3>
                                                                    <p className="text-gray-600">
                                                                        {orderItem.price.toFixed(
                                                                            2,
                                                                        )}
                                                                        ₽
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <h3 className="font-semibold">
                                                                {
                                                                    orderItem.quantity
                                                                }{" "}
                                                                шт
                                                            </h3>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                            <DialogFooter>
                                                {order.status ===
                                                "PROCESSED" ? (
                                                    <div className="flex w-full items-center justify-between">
                                                        <p className="font-semibold">
                                                            Вам пришел заказ?
                                                        </p>
                                                        <div className="space-x-2">
                                                            <Button
                                                                onClick={() =>
                                                                    changeReRenderDeliver(
                                                                        "DELIVERED",
                                                                        order.id,
                                                                    )
                                                                }
                                                            >
                                                                Да
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                onClick={() =>
                                                                    changeReRenderDeliver(
                                                                        "FAILED",
                                                                        order.id,
                                                                    )
                                                                }
                                                            >
                                                                Нет
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center space-x-2 py-10">
                            <p className="align-center text-2xl font-bold">
                                Пока что нету
                            </p>{" "}
                            <Frown />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
