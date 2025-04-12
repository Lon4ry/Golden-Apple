import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui";
import { ShoppingCart } from "lucide-react";
import { CartPage } from "@/pages/cart";
import { AuthTabs } from "@/widgets/header";

export function CartWidget({ authorize }: { authorize: boolean }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <ShoppingCart className="h-8 w-8 cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="min-w-[600px] pt-16">
                {authorize ? <CartPage /> : <AuthTabs />}
            </SheetContent>
        </Sheet>
    );
}
