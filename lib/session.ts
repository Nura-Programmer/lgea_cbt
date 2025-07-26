import { SessionOptions } from "iron-session";
import { Applicant, Question, Token } from "./generated/prisma";
const { NODE_ENV, SESSION_SECRET } = process.env;

export type AdminSession = {
    isAdmin: boolean;
    adminId: number;
    adminUsername: string;
};

export type ApplicantSession = {
    applicant: Applicant;
    token?: Token;
    questions?: Question[];
}

export const sessionOptions: SessionOptions = {
    cookieName: "cbt-session",
    password: SESSION_SECRET as string,
    cookieOptions: {
        secure: NODE_ENV === "production",
    },
};
