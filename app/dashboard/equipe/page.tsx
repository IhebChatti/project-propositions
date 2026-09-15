import DashboardShell from "@/components/dashboard/DashboardShell";
import { DashboardEquipe } from "@/components/dashboard/DashboardPages";

export default function Page() {
  return (
    <DashboardShell>
      <DashboardEquipe />
    </DashboardShell>
  );
}
