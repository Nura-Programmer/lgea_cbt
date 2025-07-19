import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const questions = await prisma.question.findMany();

    return NextResponse.json(questions);
}

export async function DELETE() {
    const deleteQuestions = await prisma.question.deleteMany();

    return NextResponse.json({
        message: "All questions deleted successful",
        tokens: deleteQuestions
    });
}