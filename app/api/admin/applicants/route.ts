import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const applicants = await prisma.applicant.findMany();

    return NextResponse.json(applicants)
}

export async function DELETE() {
    const deleteApplicants = await prisma.applicant.deleteMany();

    return NextResponse.json({
        message: "All applicants deleted successful",
        tokens: deleteApplicants
    });
}