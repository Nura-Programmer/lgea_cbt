import { sessionOptions, AdminSession } from "./session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Applicant, Question, Test, Token } from "./generated/prisma";

export async function getAdminSession() {
    const cookieStore = await cookies();
    return getIronSession<AdminSession>(cookieStore, { ...sessionOptions });
}

export async function getApplicantSession() {
    const cookieStore = await cookies();
    return getIronSession<{
        applicant: Applicant,
        token: Token,
        test: Test,
        questionIds: number[]
    }>(cookieStore, { ...sessionOptions });
}

export async function setApplicantSession(
    { applicant, token, test, questions }: {
        applicant: Applicant,
        token?: Token,
        test?: Test,
        questions?: Question[]
    }) {
    const session = await getApplicantSession();

    const quest = questions?.map(({ id }) => id);

    Object.assign(session, {
        isAdmin: false,
        applicant,
        token: token ? token : session.token,
        test: test ? test : session.test,
        questionIds: quest ? quest : session?.questionIds
    });

    return await session.save();
}

const Unauthorized = NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function requireApplicant() {
    const session = await getApplicantSession();
    const { applicant, token } = session;

    if (!applicant || !token) return Unauthorized;

    return null;
}

export async function requireAdmin() {
    const session = await getAdminSession();

    if (!session.isAdmin) return Unauthorized;

    return null;
}
