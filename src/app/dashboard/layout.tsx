import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar /> {/* Your sidebar on left */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader /> {/* Header with profile */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
