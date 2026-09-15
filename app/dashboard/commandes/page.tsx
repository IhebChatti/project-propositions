import DashboardShell from "@/components/dashboard/DashboardShell";
import { DashboardCommandes } from "@/components/dashboard/DashboardPages";

export default function Page() {
  return (
    <DashboardShell>
      <DashboardCommandes />
    </DashboardShell>
  );
}
