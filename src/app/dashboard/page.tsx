  "use client";

  import { DashboardLanding } from "../../components/dashboard_landing";

  export default function DashboardPage() {

    return (
      <div className="space-y-6">
        {/* New landing UI (light theme) */}
        <div className="pt-2">
          <DashboardLanding />
        </div>
      </div>
    );
  }