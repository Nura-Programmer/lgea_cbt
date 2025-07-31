import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const tokens = await prisma.token.findMany({ include: { applicant: true } });
    const res = tokens.map(({ applicant, ...token }) => ({ ...token, appNo: token.used ? applicant?.appNo : null }));

    return NextResponse.json(res);
}

export async function DELETE() {
    const deleteTokens = await prisma.token.deleteMany();

    return NextResponse.json({
        message: "All tokens deleted successful",
        tokens: deleteTokens
    });
}