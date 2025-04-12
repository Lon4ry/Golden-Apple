import { useEffect, useState } from "react";

import { Frown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { ProductCard } from "@/entities/product/";

export function Favorites({ id }: { id: string | null }) {
    const [favorites, setFavorites] = useState(null);
    useEffect(() => {
        (async function fetchProducts() {
            if (id) {
                const response = await fetch(
                    `/api/favorites/get-favorites/${id}/favoritesList`,
                );

                const data = await response.json();
                const favorites = JSON.parse(data.favorites);
                console.log(favorites);
                setFavorites(favorites);
            }
        })();
    }, [id]);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Избранное</CardTitle>
            </CardHeader>
            <CardContent>
                {favorites?.length ? (
                    favorites.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="flex items-center justify-center space-x-2 py-10">
                        <p className="align-center text-2xl font-bold">
                            Пока что нету
                        </p>{" "}
                        <Frown />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
