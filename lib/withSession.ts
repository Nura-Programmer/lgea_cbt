import { sessionOptions, AdminSession } from "./session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Applicant, Token } from "./generated/prisma";

export async function getAdminSession() {
    const cookieStore = await cookies();
    return getIronSession<AdminSession>(cookieStore, { ...sessionOptions });
}

export async function getApplicantSession() {
    const cookieStore = await cookies();
    return getIronSession<Applicant>(cookieStore, { ...sessionOptions })
}

export async function setApplicantSession(applicant: Partial<Applicant> & { token: Token }) {
    const session = await getApplicantSession();

    Object.assign(session, {
        isAdmin: false,
        ...applicant,
        token: applicant.token,
    });

    return await session.save();
}

// export async function requireApplicant() {
//     const session = await getApplicantSession();
//     if (!session.id) {
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // console.log(session)
//     return null;
// }

export async function requireAdmin() {
    const session = await getAdminSession();
    if (!session.isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return null;
}
