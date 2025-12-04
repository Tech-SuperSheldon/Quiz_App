  "use client";

  import { DashboardLanding } from "../../components/dashboard_landing";

  export default function DashboardPage() {

    return (
      <div className="h-full">
        {/* New landing UI (light theme) */}
        <DashboardLanding />
      </div>
    );
  }