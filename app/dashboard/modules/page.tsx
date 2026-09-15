import DashboardShell from "@/components/dashboard/DashboardShell";
import { DashboardModules } from "@/components/dashboard/DashboardPages";

export default function Page() {
  return (
    <DashboardShell>
      <DashboardModules />
    </DashboardShell>
  );
}
