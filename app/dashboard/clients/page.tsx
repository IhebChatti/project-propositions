import DashboardShell from "@/components/dashboard/DashboardShell";
import { DashboardClients } from "@/components/dashboard/DashboardPages";

export default function Page() {
  return (
    <DashboardShell>
      <DashboardClients />
    </DashboardShell>
  );
}
