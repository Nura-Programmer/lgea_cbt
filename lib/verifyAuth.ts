import { NextResponse } from "next/server";
import { getAdminSession, getApplicantSession } from "./withSession";

export const Unauthenticated = NextResponse.json(
    { error: "Unauthenticated" }, { status: 401 }
);

export const isAdmin = async () => {
    const session = await getAdminSession();

    return session.isAdmin;
}

export const isApplicant = async () => {
    const session = await getApplicantSession();
    const { applicant, token } = session;

    return (applicant && token) ? true : false;
}