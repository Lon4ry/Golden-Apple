import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const [userResp, product] = await req.json();
    const cookieStore = await cookies();
    userResp.favorites.push(product);
    const newFavorites = JSON.stringify(userResp.favorites);
    console.log(userResp.id);
    try {
        await db
            .update(users)
            .set({
                favorites: newFavorites,
            })
            .where(eq(users.id, userResp.id));
        cookieStore.set("user", JSON.stringify(userResp));
        return NextResponse.json({ succes: true });
    } catch (e) {
        console.log(e);
    }
}
