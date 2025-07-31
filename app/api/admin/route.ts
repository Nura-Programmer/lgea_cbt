import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/withSession";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const session = await getAdminSession();

    if (!session || !session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { adminId, adminUsername, isAdmin } = session;

    return NextResponse.json({ adminId, adminUsername, isAdmin });
}

export async function POST(req: NextRequest) {

    const session = await getAdminSession();
    const { isAdmin, adminId } = session;

    if (!session || !isAdmin || !adminId)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { username, password } = body;
    const data: { username?: string, password?: string } = {};

    if (!username && !password)
        return NextResponse.json({ error: "Provide the username or password to change." }, { status: 301 });

    if (username && username.length) data.username = username;
    if (password && password.length) data.password = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.update({ where: { id: adminId }, data });

    session.adminUsername = admin.username;
    await session.save();

    return NextResponse.json({ message: "Updated successfully.", username });
}