import { SessionOptions } from "iron-session";
import { Applicant, QuestionType, Token } from "./generated/prisma";
const { NODE_ENV, SESSION_SECRET } = process.env;

export type AdminSession = {
    isAdmin: boolean;
    adminId: number;
    adminUsername: string;
};

export type ApplicantSession = {
    applicant: Applicant;
    questions?: QuestionSession[];
    token: Token;
};

export type QuestionSession = {
    id: number;
    questionType?: QuestionType;
    correctOption: JSON | string;
    marks?: number | null;
};

export const sessionOptions: SessionOptions = {
    cookieName: "cbt-session",
    password: SESSION_SECRET as string,
    cookieOptions: {
        secure: NODE_ENV === "production",
    },
};
