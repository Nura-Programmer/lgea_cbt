import { sessionOptions, AdminSession } from "./session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getAdminSession() {
    const cookieStore = await cookies();
    return getIronSession<AdminSession>(cookieStore, { ...sessionOptions });
}

export async function requireAdmin() {
    const session = await getAdminSession();
    if (!session.isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return null;
}
