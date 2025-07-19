import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateToken(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { tokenType, count } = body;

        if (!["english", "arabic"].includes(tokenType)) {
            return NextResponse.json({ error: "Invalid token type" }, { status: 400 });
        }

        const tokenCount = parseInt(count);
        if (isNaN(tokenCount) || tokenCount <= 0) {
            return NextResponse.json({ error: "Invalid count" }, { status: 400 });
        }

        const tokens: { token: string; tokenType: "english" | "arabic" }[] = [];

        while (tokens.length < tokenCount) {
            const tokenStr = generateToken();
            const exists = await prisma.token.findUnique({ where: { token: tokenStr } });
            if (!exists) {
                tokens.push({ token: tokenStr, tokenType });
            }
        }

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
