import { Test } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const test = await prisma.test.findFirst();

    return NextResponse.json(test);
}

export async function POST(req: NextRequest) {
    const body: Test = await req.json();

    const { isActive, questionCount, durationMinutes, instructionMinutes, instructions } = body;
    const data = { isActive, questionCount, durationMinutes, instructionMinutes, instructions };

    const updated = await prisma.test.update({ where: { id: 1 }, data });

    return NextResponse.json({ message: "Test settings saved", test: updated });
}
