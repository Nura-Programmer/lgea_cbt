import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Admin
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: await bcrypt.hash("admin123", 10),
    },
  });

  // 2. Tokens
  await prisma.token.createMany({
    data: [
      { token: "SCI-001", tokenType: "english" },
      { token: "SCI-002", tokenType: "english" },
      { token: "ARB-001", tokenType: "arabic" },
      { token: "ARB-002", tokenType: "arabic" },
    ],
    skipDuplicates: true,
  });

  // 3. Questions
  await prisma.question.createMany({
    data: [
      {
        tokenType: "english",
        question: "What is the boiling point of water?",
        questionType: "objective",
        options: JSON.stringify({ a: "90°C", b: "100°C", c: "80°C", d: "110°C" }),
        correctOption: JSON.stringify("b"),
        marks: 1,
      },
      {
        tokenType: "arabic",
        question: "ما معنى كلمة 'كتاب'؟",
        questionType: "objective",
        options: JSON.stringify({ a: "Pen", b: "Book", c: "Chair", d: "Table" }),
        correctOption: JSON.stringify("b"),
        marks: 1,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
