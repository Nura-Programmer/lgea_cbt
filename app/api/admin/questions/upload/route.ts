import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";
import { Readable } from "stream";
import os from "os";
import { IncomingMessage } from "http";
import { QuestionType, TokenType } from "@/lib/generated/prisma";

export const config = {
    api: {
        bodyParser: false,
    },
};

type CorrectOptionType = ["A" | "B" | "C" | "D"];
type FileType = [TokenType, string, QuestionType, string, string, string, string, CorrectOptionType];

function toNodeReadable(webStream: ReadableStream<Uint8Array>): Readable {
    const reader = webStream.getReader();
    return new Readable({
        async read() {
            const { done, value } = await reader.read();
            if (done) this.push(null);
            else this.push(value);
        },
    });
}

function parseForm(req: NextRequest): Promise<{ filePath: string }> {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm({ uploadDir: os.tmpdir(), keepExtensions: true });

        // Convert Web ReadableStream to Node Readable
        const nodeReq = toNodeReadable(req.body!);

        // Add required request properties
        Object.assign(nodeReq, {
            headers: Object.fromEntries(req.headers.entries()),
            method: req.method,
            url: req.url,
        });

        form.parse(nodeReq as IncomingMessage, (err, fields, files) => {
            if (err) return reject(err);

            const file = Array.isArray(files.file) ? files.file[0] : files.file;
            if (!file || !file.filepath) return reject("No file uploaded");

            resolve({ filePath: file.filepath });
        });
    });
}

export async function POST(req: NextRequest) {
    try {
        const { filePath } = await parseForm(req);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.worksheets[0];

        const questions: {
            tokenType: TokenType,
            question: string,
            questionType: QuestionType,
            options: [string, string, string, string],
            correctOption: CorrectOptionType,
        }[] = [];

        worksheet.eachRow((row) => {
            if (!row.values || !Array.isArray(row.values)) return;

            const [tokenType, question, questionType, optionA, optionB, optionC, optionD, correctOption] = row.values.slice(1) as FileType;
            if (!tokenType || !question || !questionType || !optionA || !optionB || !optionC || !optionD || !correctOption) {
                console.warn("Skipping row due to missing values:", row.values);
                return;
            }

            questions.push({
                tokenType,
                question,
                questionType,
                options: [optionA, optionB, optionC, optionD],
                correctOption,
            });
        });

        await prisma.question.createMany({ data: questions });

        return NextResponse.json({ message: `${questions.length} questions uploaded successfully.`, count: questions.length });
    } catch (error) {
        // console.error("Upload error:", error.message);
        console.error("Upload error:", error);

        return NextResponse.json(
            { error: "Failed to upload questions" },
            { status: 500 }
        );
    }
}
