import { Product } from "@/db/schema";
import { ProductCard } from "@/entities/product/ui/product-card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/ui";

export default function NewProductsCarousel({
    products,
}: {
    products: Product[];
}) {
    const date = new Date();
    const oneMonthAgo = date.setMonth(date.getMonth() - 2);

    const productsFiltered = products.filter(
        (product) => new Date(product.createdAt).getTime() >= oneMonthAgo,
    );
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="relative w-full"
        >
            <CarouselContent className="relative top-9 h-[500px]">
                {productsFiltered.splice(0, 20).map((product) => (
                    <CarouselItem
                        key={product.id}
                        className="md:basis-1/2 lg:basis-1/4"
                    >
                        <ProductCard
                            key={product.id}
                            className="h-full"
                            product={product}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="absolute top-0 right-14 space-x-4">
                <CarouselPrevious className="border-none bg-transparent" />
                <CarouselNext className="border-none bg-transparent" />
            </div>
        </Carousel>
    );
}
