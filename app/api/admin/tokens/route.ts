import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const tokens = await prisma.token.findMany();

    return NextResponse.json(tokens);
}

export async function DELETE() {
    const deleteTokens = await prisma.token.deleteMany();

    return NextResponse.json({
        message: "All tokens deleted successful",
        tokens: deleteTokens
    });
}