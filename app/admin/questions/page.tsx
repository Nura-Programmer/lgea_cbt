import DeleteAllButton from "@/components/admin/DeleteAllButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { questions } from "@/data/mocks";

export default function QuestionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Questions</h1>
        <DeleteAllButton delType="questions" />
      </div>

      <ScrollArea className="max-h-[calc(100vh-180px)] pr-2">
        <ol>
          {questions.map((q, index) => (
            <li
              key={q.id}
              className="bg-white border border-gray-200 shadow-md px-6 py-5 flex flex-col md:flex-row md:items-start gap-6 transition hover:shadow-lg"
            >
              {/* Left: Question number + question text */}
              <div className="flex-1 md:pr-6 border-r md:border-r-gray-200">
                <span className="text-sm text-gray-500 font-medium block mb-1">
                  Question {index + 1}
                </span>
                <p className="text-gray-800 text-base leading-relaxed font-medium">
                  {q.question}
                </p>
              </div>

              {/* Right: Options */}
              <div className="md:w-64 space-y-2 text-sm text-gray-700">
                {Object.entries(q.options).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-start gap-2 rounded-lg bg-gray-50 px-3 py-2"
                  >
                    <span className="font-semibold text-gray-600">{key}.</span>
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </ScrollArea>
    </div>
  );
}
