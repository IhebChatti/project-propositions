import DashboardShell from "@/components/dashboard/DashboardShell";
import { DashboardPreparation } from "@/components/dashboard/DashboardPages";

export default function Page() {
  return (
    <DashboardShell>
      <DashboardPreparation />
    </DashboardShell>
  );
}
