import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/withSession";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const BadRequest = NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
    );

    try {
        const body = await req.json();
        const { username, password } = body;

        if (!username || !password) return BadRequest;

        const admin = await prisma.admin.findUnique({
            where: { username },
        });

        if (!admin) return BadRequest;

        const isPasswordValid = await compare(password, admin.password);
        if (!isPasswordValid) return BadRequest;

        // Set session
        const session = await getAdminSession();
        session.isAdmin = true;
        session.adminId = admin.id;
        session.adminUsername = admin.username;
        await session.save();

        // Success
        return NextResponse.json({
            message: "Login successful",
            admin: {
                id: admin.id,
                username: admin.username,
            },
        });
    } catch (err) {
        console.error("Admin login error:", err);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}
