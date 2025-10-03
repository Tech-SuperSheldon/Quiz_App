// import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex mt-30 min-h-screen bg-gray-50 w-full">
       <div className="w-64 "> 
            <Sidebar /> 
      </div>
      
        <div className="flex-1 flex flex-col p-6 pr-8 mt-6 ml-4"> {/* Increased right padding and a bit of top margin */}
         <main className="flex-1 w-full max-w-7xl mx-auto"> {/* Max width for content, centered */}
          {children}
        </main>
      </div>
    </div>
  );
}
