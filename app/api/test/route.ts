import { Question } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { QuestionSession } from "@/lib/session";
import { getApplicantSession, setApplicantSession } from "@/lib/withSession";
import { NextRequest, NextResponse } from "next/server";

const QUESTIONS_LIMIT = 30; // Limit to 30 questions per applicant

export async function GET(req: NextRequest) {
    const session = await getApplicantSession();

    if (!session.applicant) return NextResponse.redirect("/login");

    const { appNo, tokenId, status } = session.applicant;

    if (!appNo || !tokenId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const requestType = req.nextUrl.searchParams.get("request");

    // Ensure session.questions is initialized
    if (!session.questions || session.questions.length === 0) session.questions = [];

    const questions = await getApplicantQuestions(session.questions);

    if (!requestType && status !== "IN_PROGRESS") {
        let questions = await prisma.question.findMany({
            where: { tokenType: session.token?.tokenType },
        });

        if (questions.length < 1) return NextResponse.json(
            { error: "No questions found for this token type." },
            { status: 404 }
        );

        // Shuffle the questions and get the first [QUESTIONS_LIMIT] questions
        questions = [...questions.sort(() => Math.random() - 0.5).slice(0, QUESTIONS_LIMIT)];

        const answers = questions.map(question => ({
            applicantId: session.applicant?.id,
            questionId: question.id
        }));

        await prisma.applicantAnswer.createMany({ data: answers as [] });

        const applicant = await prisma.applicant.update({
            where: { appNo },
            data: { status: "IN_PROGRESS" }
        });

        await setApplicantSession(applicant, session.token, questions);

        return NextResponse.json({
            message: "Successful",
            applicant,
            token: session.token,
            questions
        });
    }

    if (requestType === "startExam") {
        const applicant = await prisma.applicant.update({
            where: { appNo: appNo },
            data: { startTime: new Date() },
        });

        await setApplicantSession(applicant);

        return NextResponse.json({
            message: "Exam started successfully",
            applicant,
            token: session.token,
            questions
        });
    }

    return NextResponse.json({
        message: "Session restored.",
        applicant: session.applicant,
        token: session.token,
        questions
    });
}

export async function POST(req: NextRequest) {
    const session = await getApplicantSession();
    const { applicant, questions } = session;
    const { appNo, id, tokenId } = applicant;

    if (!appNo || !tokenId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const body = await req.json();
    const { answers }: { answers: Record<number, string> } = body;

    if (!answers) return NextResponse.json({ error: "Error sumitting" }, { status: 401 });

    // Search through the answers and update the ApplicantAnswer records
    await updateApplicantAnswers(answers, id, questions as QuestionSession[]);

    // TODO: Calculate applicant score
    const score = await prisma.applicantAnswer.aggregate({
        _count: { isCorrect: true },
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
    const { appNo, id, tokenId } = session.applicant;

    if (!appNo || !tokenId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const body = await req.json();
    const { answers }: { answers: Record<number, string> } = body;

    if (!answers) return NextResponse.json({ error: "No answers provided." });

    // Search through the answers and update the ApplicantAnswer records
    await updateApplicantAnswers(answers, id, session.questions as QuestionSession[]);

    return NextResponse.json({
        applicant: session.applicant,
        token: session.token,
        questions: getApplicantQuestions(session.questions)
    });
}

const getApplicantQuestions = async (questions: Question[]) => {
    return await Promise.all(
        questions.map(async question => await prisma.question.findUnique({ where: { id: question.id } }))
    );
}

const isCorrectSelection = (questions: QuestionSession[], questionId: string, selectedOption: string) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    return question?.correctOption?.toString().toLowerCase() === selectedOption.toLowerCase();
}

const updateApplicantAnswers = async (answers: Record<number, string>, id: number, questions: QuestionSession[]) => {
    await Promise.all(
        Object.entries(answers).map(async ([questionId, selectedOption]) => {
            // check if selectedOption is correct and Update ApplicantAnswer
            if (questions)
                await prisma.applicantAnswer.updateMany({
                    where: { applicantId: id, questionId: parseInt(questionId) },
                    data: {
                        selected: selectedOption,
                        isCorrect: isCorrectSelection(questions, questionId, selectedOption)
                    }
                });
        })
    );
}
