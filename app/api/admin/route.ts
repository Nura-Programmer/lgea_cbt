import { prisma } from "@/lib/prisma";
import { isAdmin, Unauthenticated } from "@/lib/verifyAuth";
import { getAdminSession } from "@/lib/withSession";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    if (!isAdmin()) return Unauthenticated;

    const session = await getAdminSession();
    const { adminId, adminUsername, isAdmin: isAdminSession } = session;

    return NextResponse.json({ adminId, adminUsername, isAdmin: isAdminSession });
}

export async function POST(req: NextRequest) {
    if (!isAdmin()) return Unauthenticated;

    const session = await getAdminSession();

    const body = await req.json();
    const { username, password } = body;
    const data: { username?: string, password?: string } = {};

    if (!username && !password)
        return NextResponse.json(
            { error: "Provide the username or password to change." },
            { status: 301 }
        );

    if (username && username.length) data.username = username;
    if (password && password.length) data.password = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.update({ where: { id: session.adminId }, data });

    session.adminUsername = admin.username;
    await session.save();

    return NextResponse.json({ message: "Updated successfully.", username });
}