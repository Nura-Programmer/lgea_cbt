import { SessionOptions } from "iron-session";
import { ApplicantAnswer, Status, TokenType } from "./generated/prisma";

export type AdminSession = {
    isAdmin: boolean;
    adminId: number;
    adminUsername: string;
};

export type Applicant = {
    appNo: string;
    firstName: string
    surname: string;

    status?: Status;
    score?: number;
    answers?: ApplicantAnswer;

    tokenId?: number;
    token?: TokenType;
}

export const sessionOptions: SessionOptions = {
    cookieName: "cbt-session",
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};
