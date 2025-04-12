"use server";
import { db } from "@/db";
import { orderItems, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request,{ params }: { params: Promise<{ id: string }> }) {
   const productParam = await params;
   console.log(productParam);
    const product  = await db
        .select()
        .from(products)
        .where(eq(products.id, productParam.id));
    const productSaled = await db
        .select()
        .from(orderItems)
        .where(eq(productParam.id, orderItems.productId));
    return NextResponse.json([product[0], productSaled.length]);
}
