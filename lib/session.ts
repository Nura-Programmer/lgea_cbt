import { SessionOptions } from "iron-session";

export type AdminSession = {
    isAdmin: boolean;
    adminId: number;
};

export const sessionOptions: SessionOptions = {
    cookieName: "cbt-session",
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};
