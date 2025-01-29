import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";

export async function GET() {
    const allProducts = await db.select().from(products);
    return NextResponse.json(allProducts);
}
