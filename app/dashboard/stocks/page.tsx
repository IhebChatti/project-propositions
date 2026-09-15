import DashboardShell from "@/components/dashboard/DashboardShell";
import { DashboardStocks } from "@/components/dashboard/DashboardPages";

export default function Page() {
  return (
    <DashboardShell>
      <DashboardStocks />
    </DashboardShell>
  );
}
