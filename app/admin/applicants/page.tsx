import DeleteAllButton from "@/components/admin/DeleteAllButton";
import UploadApplicantsForm from "@/components/admin/UploadForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data — Replace with real data fetched via Prisma/React Query later
const applicants = [
  {
    id: 1,
    appNo: "SCI001",
    firstName: "Aisha",
    surname: "Abdullahi",
    status: "PENDING",
    tokenType: "science",
  },
  {
    id: 2,
    appNo: "ARA002",
    firstName: "Yusuf",
    surname: "Ahmed",
    status: "DONE",
    tokenType: "arabic",
  },
  {
    id: 3,
    appNo: "SCI003",
    firstName: "Fatima",
    surname: "Sani",
    status: "IN_PROGRESS",
    tokenType: "science",
  },
];

export default function ApplicantsPage() {
  if (!applicants || applicants.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center space-y-4 text-center">
        <h2 className="text-xl font-semibold text-red-800">
          No applicants found!
        </h2>
        <UploadApplicantsForm />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Applicants</h1>
        <DeleteAllButton delType="applicants" />
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>App No</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Surname</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Token Type</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell>{applicant.appNo}</TableCell>
                <TableCell>{applicant.firstName}</TableCell>
                <TableCell>{applicant.surname}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      applicant.status === "DONE"
                        ? "bg-green-100 text-green-700"
                        : applicant.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {applicant.status}
                  </span>
                </TableCell>
                <TableCell className="capitalize">
                  {applicant.tokenType}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
