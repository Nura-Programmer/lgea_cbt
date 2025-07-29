import { getAdminSession } from "@/lib/withSession";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getAdminSession();

    if (!session || !session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { adminId, adminUsername, isAdmin } = session;

    return NextResponse.json({ adminId, adminUsername, isAdmin });
}