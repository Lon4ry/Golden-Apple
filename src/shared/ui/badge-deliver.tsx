import { Badge } from "./badge";

export default function DeliverBadge({ status }: { status: string }) {
    return (
        <Badge
            variant="outline"
            className={
                status === "DELIVERED"
                    ? "bg-green-100 text-lg text-green-800"
                    : status === "PROCESSED"
                      ? "bg-blue-100 text-lg text-blue-800"
                      : "bg-red-100 text-lg text-red-800"
            }
        >
            {status === "DELIVERED"
                ? "Доставлен"
                : status === "PROCESSED"
                  ? "В пути"
                  : "Не доставлен"}
        </Badge>
    );
}
