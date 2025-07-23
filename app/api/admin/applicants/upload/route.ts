import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";
import { Readable } from "stream";
import os from "os";
import { IncomingMessage } from "http";

export const config = {
    api: {
        bodyParser: false,
    },
};

type FileType = [string, string, string];

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
        // path.join(path.basename, "./temp")
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

        const applicants: {
            appNo: string;
            firstName: string;
            surname: string;
        }[] = [];

        // Validate worksheet
        if (!worksheet || !worksheet.rowCount) {
            return NextResponse.json({ error: "Invalid or empty Excel file" }, { status: 400 });
        }

        // worksheet.eachRow contains rows, each row has values 
        // and rowNumber contains the number of rows in the worksheet
        worksheet.eachRow((row) => {
            if (!row.values || !Array.isArray(row.values)) return;

            const [appNo, firstName, surname] = row.values.slice(1) as FileType;
            applicants.push({
                appNo: String(appNo),
                firstName,
                surname,
            });
        });

        await prisma.applicant.createMany({ data: applicants });

        return NextResponse.json({ message: `${applicants.length} applicants uploaded successfully.`, count: applicants.length });
    } catch (error) {
        // console.error("Upload error:", error.message);
        console.error("Upload error:", error);

        return NextResponse.json(
            { error: "Failed to upload applicants" },
            { status: 500 }
        );
    }
}
