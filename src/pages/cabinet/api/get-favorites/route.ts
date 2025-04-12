import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    console.log(params);
    const id = await params.id;

    const [favorites] = await db
        .select({ favorites: users.favorites })
        .from(users)
        .where(eq(users.id, id));

    return NextResponse.json(favorites);
}
