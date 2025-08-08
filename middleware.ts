import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, requireApplicant } from "./lib/withSession";

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    const isAdminProtected = url.pathname.startsWith("/admin");
    const isApplicantProtected = url.pathname.startsWith("/test");

    if (isApplicantProtected && await requireApplicant()) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAdminProtected && await requireAdmin()) {
        return NextResponse.redirect(new URL("/login/admin", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/:path*", "/test"],
};
