import DashboardShell from "@/components/dashboard/DashboardShell";
import { DashboardOverview } from "@/components/dashboard/DashboardPages";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardOverview />
    </DashboardShell>
  );
}
