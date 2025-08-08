import { prisma } from "@/lib/prisma";
import { isAdmin, Unauthenticated } from "@/lib/verifyAuth";
import { NextResponse } from "next/server";

export async function GET() {
    if (!isAdmin()) return Unauthenticated;

    const applicants = await prisma.applicant.findMany({ include: { token: true } });

    return NextResponse.json(applicants);
}

export async function DELETE() {
    if (!isAdmin()) return Unauthenticated;

    const deleteApplicants = await prisma.applicant.deleteMany();

    return NextResponse.json({
        message: "All applicants deleted successful",
        tokens: deleteApplicants
    });
}