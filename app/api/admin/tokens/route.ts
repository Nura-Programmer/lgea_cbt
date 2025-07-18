import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const tokens = await prisma.token.findMany();

    return NextResponse.json(tokens);
}