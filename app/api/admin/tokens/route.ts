import { prisma } from "@/lib/prisma";
import { isAdmin, Unauthenticated } from "@/lib/verifyAuth";
import { NextResponse } from "next/server";

export async function GET() {
    if (!isAdmin()) return Unauthenticated;

    const tokens = await prisma.token.findMany({ include: { applicant: true } });
    const res = tokens.map(({ applicant, ...token }) =>
        ({ ...token, appNo: token.used ? applicant?.appNo : null })
    );

    return NextResponse.json(res);
}

export async function DELETE() {
    if (!isAdmin()) return Unauthenticated;

    const deleteTokens = await prisma.token.deleteMany();

    return NextResponse.json({
        message: "All tokens deleted successful",
        tokens: deleteTokens
    });
}