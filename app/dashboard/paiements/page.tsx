import DashboardShell from "@/components/dashboard/DashboardShell";
import { DashboardPaiements } from "@/components/dashboard/DashboardPages";

export default function Page() {
  return (
    <DashboardShell>
      <DashboardPaiements />
    </DashboardShell>
  );
}
