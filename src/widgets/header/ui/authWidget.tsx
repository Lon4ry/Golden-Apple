import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui";
import { UserRound } from "lucide-react";
import { AuthTabs } from "@/widgets/header";

export function AuthWidget() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <UserRound className="h-12 w-12 cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="min-w-[600px] pt-16">
                <AuthTabs />
            </SheetContent>
        </Sheet>
    );
}
