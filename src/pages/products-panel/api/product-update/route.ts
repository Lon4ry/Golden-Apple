"use server";

import { db } from "@/db";
import { NewProduct, products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(data: NewProduct) {
    await db
        .update(products)
        .set({
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.category,
            stock: data.stock,
            manufacturer: data.manufacturer,
        })
        .where(eq(products.id, data.id));
}
