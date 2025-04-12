import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(id: string) {
    await db.delete(products).where(eq(products.id, id));
}
