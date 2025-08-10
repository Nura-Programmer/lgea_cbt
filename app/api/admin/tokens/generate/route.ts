import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin, Unauthenticated } from "@/lib/verifyAuth";

function generateToken(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function getTokens(type: "english" | "arabic", quantity: number) {
    const tokens: { token: string; tokenType: "english" | "arabic" }[] = [];

    while (tokens.length < quantity) {
        const tokenStr = generateToken();
        const exists = await prisma.token.findUnique({ where: { token: tokenStr } });
        if (!exists) {
            tokens.push({ token: tokenStr, tokenType: type });
        }
    }

    return tokens;
}

export async function POST(req: NextRequest) {
    if (!isAdmin()) return Unauthenticated;

    try {
        const body = await req.json();
        const { engTokenCount, arabTokenCount } = body;

        const engTokenQuantity = parseInt(engTokenCount);
        if (isNaN(engTokenQuantity) || engTokenQuantity <= 0) {
            return NextResponse.json(
                { error: "Invalid English tokens count" },
                { status: 400 }
            );
        }

        const arabTokenQuantity = parseInt(arabTokenCount);
        if (isNaN(arabTokenQuantity) || arabTokenQuantity <= 0) {
            return NextResponse.json(
                { error: "Invalid Arabic tokens count" },
                { status: 400 }
            );
        }

        const engTokens = await getTokens("english", engTokenQuantity);
        const arabTokens = await getTokens("arabic", arabTokenQuantity);
        const tokens = [...engTokens, ...arabTokens];

        const created = await prisma.token.createMany({ data: tokens });

        return NextResponse.json({
            message: `${created.count} tokens created`,
            tokens,
        });
    } catch (error) {
        console.error("Token generation error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
