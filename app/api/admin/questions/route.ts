import { prisma } from "@/lib/prisma";
import { isAdmin, Unauthenticated } from "@/lib/verifyAuth";
import { NextResponse } from "next/server";

export async function GET() {
    if (!isAdmin()) return Unauthenticated;

    const questions = await prisma.question.findMany();

    return NextResponse.json(questions);
}

export async function DELETE() {
    if (!isAdmin()) return Unauthenticated;

    const deleteQuestions = await prisma.question.deleteMany();

    return NextResponse.json({
        message: "All questions deleted successful",
        tokens: deleteQuestions
    });
}