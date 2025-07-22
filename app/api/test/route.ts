import { Token } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getApplicantSession, setApplicantSession } from "@/lib/withSession";
import { NextResponse } from "next/server";

export async function GET() {

    const session = await getApplicantSession();
    const { appNo, tokenId } = session;

    if (!appNo || !tokenId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const applicant = await prisma.applicant.findUnique({ where: { appNo, tokenId }, include: { token: true } });

    if (!applicant) return NextResponse.redirect("/login");

    const questions = await prisma.question.findMany({
        where: { tokenType: applicant.token?.tokenType },
        orderBy: { id: "asc" },
        take: 3, // Limit to 3 questions
    });

    await prisma.applicant.update({ where: { appNo }, data: { status: "IN_PROGRESS" } });

    await setApplicantSession({ ...applicant, token: applicant.token as Token });

    return NextResponse.json({ message: "Successful", applicant: { ...applicant }, questions });
}