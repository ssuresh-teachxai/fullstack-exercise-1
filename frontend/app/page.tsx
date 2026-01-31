import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ProjectFilters } from "@/components/features/project/Filters";
import { KanbanBoard } from "@/components/features/kanban/Board";

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-[#F5F5F7] overflow-hidden font-sans">
      {/* Left Sidebar */}
      <Sidebar className="hidden md:flex flex-shrink-0" />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header />

        {/* Scrollable Content */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <ProjectFilters />
          <KanbanBoard />
        </main>
      </div>
    </div>
  );
}
