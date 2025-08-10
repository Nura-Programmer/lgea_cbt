import { prisma } from "@/lib/prisma";
import { setApplicantSession } from "@/lib/withSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const BadRequest = NextResponse.json(
        { error: "All fields are required" }, { status: 400 }
    );

    const test = await prisma.test.findFirst();


    if (!test)
        return NextResponse.json({ error: "Test need to be set by the admin." }, { status: 301 });

    const isActive = test ? test.isActive : false;

    if (!isActive)
        return NextResponse.json({ error: "Test was de-activated by the admin." }, { status: 301 });

    try {
        const body = await req.json();
        const { appNo, tokens } = body;

        if (!appNo || !tokens) return BadRequest;

        let applicant = await prisma.applicant.findUnique({ where: { appNo } });
        if (!applicant) return BadRequest;

        if (applicant.status === "DONE")
            return NextResponse.json({ error: "You already take your test." }, { status: 401 });

        const token = await prisma.token.findUnique({ where: { token: tokens } });
        if (!token) return NextResponse.json({ error: "Invalid tokens" }, { status: 400 });

        if (token.used && token.id !== applicant.tokenId)
            return NextResponse.json({ error: "Token already being used." }, { status: 400 });

        // update
        applicant = await prisma.applicant.update({ where: { appNo }, data: { tokenId: token.id } });
        await prisma.token.update({ where: { id: token.id }, data: { used: true } });

        // Set session applicant and tokens
        // Questions will be set after the user actually start the test
        await setApplicantSession({ applicant, token, test });

        return NextResponse.json({
            message: "Login successful",
            applicant,
            token,
            test
        });

    } catch (error) {
        console.error("Applicant login error: ", error);

        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}