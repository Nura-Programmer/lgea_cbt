import Sidebar from "@/components/admin/Sidebar";
import { getAdminSession } from "@/lib/withSession";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { adminUsername } = await getAdminSession();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar adminUsername={adminUsername} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
