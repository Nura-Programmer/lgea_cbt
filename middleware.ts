import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "./lib/withSession";

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    const protectedPaths = ["/admin", "/api/applicants", "/api/questions", "/api/tokens"];

    const isProtected = protectedPaths.some((path) =>
        url.pathname.startsWith(path) && !url.pathname.startsWith("/admin/login")
    );

    if (isProtected && await requireAdmin()) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/:path*"],
};
