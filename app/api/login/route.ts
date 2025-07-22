import { prisma } from "@/lib/prisma";
import { setApplicantSession } from "@/lib/withSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const BadRequest = NextResponse.json(
        { error: "All fields are required" }, { status: 400 }
    );



    try {
        const body = await req.json();
        const { appNo, tokens } = body;

        if (!appNo || !tokens) return BadRequest;

        let applicant = await prisma.applicant.findUnique({ where: { appNo } });
        if (!applicant) return BadRequest;

        const token = await prisma.token.findUnique({ where: { token: tokens, AND: { used: false } } });
        if (!token) return BadRequest;

        // update
        applicant = await prisma.applicant.update({ where: { appNo }, data: { tokenId: token.id }, include: { token: true } });
        await prisma.token.update({ where: { id: token.id }, data: { used: true }, include: { applicant: true } });

        // Set session
        await setApplicantSession({ ...applicant, token });

        return NextResponse.json({
            message: "Login successful",
            applicant,
            token
        })

    } catch (error) {
        console.error("Applicant login error: ", error);

        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}