import DashboardCards from "@/components/admin/DashboardCards";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-600">Quick overview and actions</p>
      <DashboardCards />
    </div>
  );
}
