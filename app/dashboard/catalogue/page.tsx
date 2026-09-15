import DashboardShell from "@/components/dashboard/DashboardShell";
import { DashboardCatalogue } from "@/components/dashboard/DashboardPages";

export default function Page() {
  return (
    <DashboardShell>
      <DashboardCatalogue />
    </DashboardShell>
  );
}
