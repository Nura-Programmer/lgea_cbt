import { Token } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getApplicantSession, setApplicantSession } from "@/lib/withSession";
import { NextRequest, NextResponse } from "next/server";

const QUESTIONS_LIMIT = 3; // Limit to 3 questions per applicant

export async function GET(req: NextRequest) {

    const session = await getApplicantSession();
    const { appNo, tokenId } = session;

    if (!appNo || !tokenId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    let applicant = await prisma.applicant.findUnique({ where: { appNo, tokenId }, include: { token: true } });

    if (!applicant) return NextResponse.redirect("/login");

    const requestType = req.nextUrl.searchParams.get("request");

    if (!requestType) {
        let questions = await prisma.question.findMany({
            where: { tokenType: applicant.token?.tokenType },
        });

        if (questions.length < 1) return NextResponse.json(
            { error: "No questions found for this token type." },
            { status: 404 }
        );

        // shauffle the questions and Get the first [QUESTIONS_LIMIT] questions
        questions = [...questions.sort(() => Math.random() - 0.5).slice(0, QUESTIONS_LIMIT)];

        // Create ApplicantAnswer record of the current applicant
        // to be updated on every users patch request
        const answers = questions.map(question => ({
            applicantId: applicant?.id,
            questionId: question.id,
            selected: null
        }));

        // Create ApplicantAnswer records in bulk
        await prisma.applicantAnswer.createMany({ data: answers as [] });

        applicant = await prisma.applicant.update({ where: { appNo }, data: { status: "IN_PROGRESS" }, include: { token: true } });

        await setApplicantSession({ ...applicant, token: applicant.token as Token });

        return NextResponse.json({ message: "Successful", applicant, questions });
    }

    if (requestType === "startExam") {
        const applicant = await prisma.applicant.update({
            where: { appNo: appNo },
            data: { startTime: new Date() },
        });

        session.startTime = applicant.startTime;
        await session.save();

        return NextResponse.json({ message: "Exam started successfully", applicant });
    }
}

export async function POST(req: NextRequest) {
    const session = await getApplicantSession();
    const { appNo, id, tokenId } = session;

    if (!appNo || !tokenId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const body = await req.json();
    const { answers }: { answers: Record<number, string> } = body;

    if (!answers) return NextResponse.json({ error: "Error sumitting" }, { status: 401 });

    // Search through the answers and update the ApplicantAnswer records
    await Promise.all(
        Object.entries(answers).map(async ([questionId, selectedOption]) => {
            // check if selectedOption is correct
            // and Update ApplicantAnswer
            await prisma.applicantAnswer.updateMany({
                where: { applicantId: id, questionId: parseInt(questionId) },
                data: {
                    selected: selectedOption,
                    isCorrect: (await prisma.question.findUnique({
                        where: { id: parseInt(questionId) },
                        select: { correctOption: true }
                    }))?.correctOption?.toString().toLowerCase() === selectedOption.toLowerCase()
                }
            });
        })
    );

    // TODO: Calculate applicant score
    const score = await prisma.applicantAnswer.aggregate({
        _count: {
            isCorrect: true
        },
        where: { applicantId: id }
    });


    await prisma.applicant.update({
        where: { appNo, tokenId },
        data: {
            status: "DONE",
            endTime: new Date(),
            score: score._count.isCorrect // Assuming each question carry 1 mark
        }
    });

    session.destroy();
    return NextResponse.json({ message: "Exam submitted successfully" });
}

export async function PATCH(req: NextRequest) {
    const session = await getApplicantSession();
    const { appNo, id, tokenId } = session;

    if (!appNo || !tokenId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const body = await req.json();
    const { answers }: { answers: Record<number, string> } = body;

    if (!answers) return NextResponse.json({ error: "No answers provided." });

    // Search through the answers and update the ApplicantAnswer records
    await Promise.all(
        Object.entries(answers).map(async ([questionId, selectedOption]) => {
            // check if selectedOption is correct
            // and Update ApplicantAnswer
            await prisma.applicantAnswer.updateMany({
                where: { applicantId: id, questionId: parseInt(questionId) },
                data: {
                    selected: selectedOption,
                    isCorrect: (await prisma.question.findUnique({
                        where: { id: parseInt(questionId) },
                        select: { correctOption: true }
                    }))?.correctOption?.toString().toLowerCase() === selectedOption.toLowerCase()
                }
            });
        })
    );

    return NextResponse.json(null);
}