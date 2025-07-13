import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required." },
                { status: 400 }
            );
        }

        const admin = await prisma.admin.findUnique({
            where: { username },
        });

        if (!admin) {
            return NextResponse.json(
                { error: "Invalid username or password." },
                { status: 401 }
            );
        }

        const isPasswordValid = await compare(password, admin.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid username or password." },
                { status: 401 }
            );
        }

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
