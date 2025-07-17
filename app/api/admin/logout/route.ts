import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/withSession";

export async function POST() {
    const session = await getAdminSession();
    session.destroy();
    return NextResponse.json({ message: "Logout successful" });
}
