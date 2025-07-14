import DeleteAllButton from "@/components/admin/DeleteAllButton";
import UploadForm from "@/components/admin/UploadForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { applicants, applicantsExist } from "@/data/mocks";

export default function ApplicantsPage() {
  if (!applicants || !applicantsExist) {
    return (
      <div className="h-full flex flex-col justify-center items-center space-y-4 text-center">
        <h2 className="text-xl font-semibold text-red-800">
          No applicants found!
        </h2>
        <UploadForm uploadType="applicants" />
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
            {applicants.map(
              ({ id, appNo, firstName, surname, status, tokenType }) => (
                <TableRow key={id}>
                  <TableCell>{appNo}</TableCell>
                  <TableCell>{firstName}</TableCell>
                  <TableCell>{surname}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        status === "DONE"
                          ? "bg-green-100 text-green-700"
                          : status === "IN_PROGRESS"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {status}
                    </span>
                  </TableCell>
                  <TableCell className="capitalize">{tokenType}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
