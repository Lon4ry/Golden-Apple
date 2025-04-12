import { Skeleton } from ".//skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "./card";

export function ProductCardSkeleton() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
                <Skeleton className="mb-4 h-[200px] w-full" />
                <Skeleton className="mb-2 h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    );
}

export function ProfileSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                </div>
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    );
}

export function OrderSkeleton() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-[200px]" />
                    <Skeleton className="h-6 w-[100px]" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <Skeleton className="mb-2 h-4 w-[150px]" />
                        <Skeleton className="mb-1 h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <div>
                        <Skeleton className="mb-2 h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                </div>
                <Skeleton className="my-6 h-px w-full" />
                <Skeleton className="mb-4 h-6 w-[150px]" />
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[50px]" />
                            <Skeleton className="h-4 w-[80px]" />
                            <Skeleton className="h-4 w-[80px]" />
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-end">
                    <Skeleton className="h-6 w-[120px]" />
                </div>
            </CardContent>
        </Card>
    );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function PersonalCabinetSkeleton() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-[200px]" />
                            <Skeleton className="h-4 w-[300px]" />
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-1/3" />
                            <Skeleton className="mt-2 h-4 w-1/4" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/4" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <OrderSkeleton key={i} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
