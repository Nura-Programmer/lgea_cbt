import { Question } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getApplicantSession, setApplicantSession } from "@/lib/withSession";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getApplicantSession();

    if (!session.applicant || !session.test)
        return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const { appNo, tokenId, status } = session.applicant;

    if (!appNo || !tokenId)
        return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const requestType = req.nextUrl.searchParams.get("request");

    // Ensure session.questions is initialized
    if (!session.questionIds || session.questionIds.length === 0) session.questionIds = [];

    const questions = await getApplicantQuestions(session.questionIds);

    if (!requestType && status === "PENDING") {
        let questions = await prisma.question.findMany({
            where: { tokenType: session.token?.tokenType },
        });

        if (questions.length < 1) return NextResponse.json(
            { error: "No questions found for this token type." },
            { status: 404 }
        );

        const test = await prisma.test.findFirst();
        // Get the questions limit per applicant from DB or set it to default (30)
        const QUESTIONS_LIMIT = test ? test.questionCount : 30;

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

        await setApplicantSession({ applicant, token: session.token, questions });

        return NextResponse.json({
            message: "Successful",
            applicant,
            token: session.token,
            test: session.test,
            questions
        });
    }

    if (requestType === "startExam") {
        const applicant = await prisma.applicant.update({
            where: { appNo: appNo },
            data: { startTime: new Date() },
        });

        await setApplicantSession({ applicant });

        return NextResponse.json({
            message: "Exam started successfully",
            applicant,
            token: session.token,
            test: session.test,
            questions
        });
    }

    return NextResponse.json({
        message: "Session restored.",
        applicant: session.applicant,
        token: session.token,
        test: session.test,
        questions
    });
}

export async function POST(req: NextRequest) {
    const session = await getApplicantSession();
    const { applicant, questionIds } = session;
    const { appNo, id, tokenId } = applicant;

    if (!appNo || !tokenId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const body = await req.json();
    const { answers }: { answers: Record<number, string> } = body;

    if (!answers) return NextResponse.json({ error: "Error submitting" }, { status: 401 });

    // Search through the answers and update the ApplicantAnswer records
    await updateApplicantAnswers(answers, id, questionIds);

    // Calculate applicant score based on the actual count of isCorrect in the database
    const score = await prisma.applicantAnswer.count({
        where: { applicantId: id, isCorrect: true }
    });

    await prisma.applicant.update({
        where: { appNo, tokenId },
        data: {
            status: "DONE",
            endTime: new Date(),
            score // Save the actual count of correct answers as the score
        }
    });

    session.destroy();
    return NextResponse.json({ message: "Exam submitted successfully" });
}

export async function PATCH(req: NextRequest) {
    const session = await getApplicantSession();
    const { applicant, questionIds, token, test } = session;
    const { appNo, id, tokenId } = applicant;

    if (!appNo || !tokenId || !test) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const body = await req.json();
    const { answers }: { answers: Record<number, string> } = body;

    if (!answers) return NextResponse.json({ error: "No answers provided." });

    // Search through the answers and update the ApplicantAnswer records
    await updateApplicantAnswers(answers, id, questionIds);

    return NextResponse.json({
        applicant,
        token,
        test,
        questions: getApplicantQuestions(questionIds)
    });
}

const getApplicantQuestions = async (questionIds: number[]) => {
    return await Promise.all(
        questionIds.map(async qId => await prisma.question.findUnique({ where: { id: qId } }))
    );
}

const isCorrectSelection = (questions: Question[], questionId: string, selectedOption: string) => {
    if (!questions || questions.length === 0) return false; // Validate questions array

    const question = questions.find(q => q.id === parseInt(questionId));
    if (!question || !question.correctOption) return false; // Validate question and correctOption

    return question.correctOption.toString().toLowerCase() === selectedOption.toLowerCase();
}

const updateApplicantAnswers = async (answers: Record<number, string>, id: number, questionIds: number[]) => {
    await Promise.all(
        Object.entries(answers).map(async ([questionId, selectedOption]) => {
            const questions = await getApplicantQuestions(questionIds);

            // check if selectedOption is correct and Update ApplicantAnswer
            await prisma.applicantAnswer.updateMany({
                where: { applicantId: id, questionId: parseInt(questionId) },
                data: {
                    selected: selectedOption,
                    isCorrect: isCorrectSelection(questions as Question[], questionId, selectedOption)
                }
            });
        })
    );
}
