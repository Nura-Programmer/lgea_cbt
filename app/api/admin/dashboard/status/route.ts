import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin, Unauthenticated } from "@/lib/verifyAuth";

export async function GET() {
    if (!isAdmin()) return Unauthenticated;

    const [applicantCount, questionCount, tokenCount, test] = await Promise.all([
        prisma.applicant.count(),
        prisma.question.count(),
        prisma.token.count(),
        prisma.test.findFirst()
    ]);

    const isActive = test ? test.isActive : false;

    const status = [
        {
            title: "applicants",
            isReady: applicantCount > 0,
            statusText: applicantCount > 0 ? "Applicants uploaded" : "Upload applicants!",
        },
        {
            title: "questions",
            isReady: questionCount > 0,
            statusText: questionCount > 0 ? "Questions uploaded" : "Upload questions!",
        },
        {
            title: "tokens",
            isReady: tokenCount > 0,
            statusText: tokenCount > 0 ? "Tokens available" : "Generate new tokens",
        },
        {
            title: "test",
            isReady: isActive,
            statusText: isActive ? "Test is activate" : "Activate test",
        },
    ]

    return NextResponse.json(status);
}
