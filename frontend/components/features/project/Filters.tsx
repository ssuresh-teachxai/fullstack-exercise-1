'use client'
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AddTaskModal } from "@/components/features/kanban/AddTaskModal";
import { Avatar } from "@/components/ui/Avatar";
import {
    Pencil,
    Share2,
    Zap,
    List,
    Layout,
    CalendarDays,
    FileText,
    Plus,
    SlidersHorizontal,
    ChevronDown,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
    { label: "Overview", icon: CheckCircle2 },
    { label: "List", icon: List },
    { label: "Board", icon: Layout },
    { label: "Calendar", icon: CalendarDays },
    { label: "Files", icon: FileText },
];

export function ProjectFilters() {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    return (
        <div className="flex flex-col bg-white">
            <AddTaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
            />
            {/* Top: Project Title & Actions */}
            <div className="flex items-center justify-between px-8 py-6">
                <div className="flex items-center gap-4">
                    {/* Icon logic: Image shows a layout-like icon in purple? No, it's just text "Design Project" with an icon. */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6366F1] text-white shadow-sm">
                        <Layout className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-zinc-900">Design Project</h1>
                            <button className="text-zinc-400 hover:text-zinc-900">
                                <Pencil className="h-4 w-4" />
                            </button>
                        </div>
                        {/* Avatars row in title area? No, separate. */}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex -space-x-3 mr-2">
                        <Avatar className="h-9 w-9 border-2 border-white" size="sm" fallback="JD" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                        <Avatar className="h-9 w-9 border-2 border-white" size="sm" fallback="AS" />
                    </div>
                    <Button variant="outline" className="h-10 rounded-lg gap-2 font-medium text-zinc-600 border-zinc-200">
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                    <Button variant="outline" className="h-10 rounded-lg gap-2 font-medium text-zinc-600 border-zinc-200">
                        <Zap className="h-4 w-4" />
                        Automation
                    </Button>
                </div>
            </div>

            {/* Middle: Tabs */}
            <div className="flex items-center px-8 border-b border-zinc-200/60">
                {TABS.map((tab) => (
                    <button
                        key={tab.label}
                        className={cn(
                            "flex items-center gap-2 border-b-[3px] px-1 py-4 text-sm font-semibold transition-colors mr-8",
                            tab.label === "Board"
                                ? "border-[#6366F1] text-[#6366F1]"
                                : "border-transparent text-zinc-500 hover:text-zinc-700"
                        )}
                    >
                        {tab.icon && <tab.icon className={cn("h-5 w-5", tab.label === "Board" ? "stroke-[2.5px]" : "stroke-2")} />}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Bottom: Filters */}
            <div className="flex items-center justify-between px-8 py-5">
                <div className="flex items-center gap-3">
                    {/* "Due Date: March 17-20" style */}
                    <Button variant="outline" className="h-9 rounded-lg border-zinc-200 text-zinc-600 font-medium bg-white hover:bg-zinc-50 gap-2 px-3 text-sm">
                        <span className="text-zinc-400 font-normal">Due Date</span>
                        <span className="text-zinc-900">March 17 - 20</span>
                        <ChevronDown className="h-3.5 w-3.5 text-zinc-400 ml-1" />
                    </Button>

                    <Button variant="outline" className="h-9 rounded-lg border-zinc-200 text-zinc-600 font-medium bg-white hover:bg-zinc-50 gap-2 px-3 text-sm">
                        <span className="text-zinc-400 font-normal">Assignee</span>
                        <span className="text-zinc-900">All</span>
                        <ChevronDown className="h-3.5 w-3.5 text-zinc-400 ml-1" />
                    </Button>

                    <Button variant="outline" className="h-9 rounded-lg border-zinc-200 text-zinc-600 font-medium bg-white hover:bg-zinc-50 gap-2 px-3 text-sm">
                        <span className="text-zinc-400 font-normal">Priority</span>
                        <span className="text-zinc-900">All</span>
                        <ChevronDown className="h-3.5 w-3.5 text-zinc-400 ml-1" />
                    </Button>

                    <Button variant="ghost" className="h-9 gap-2 text-zinc-500 hover:text-zinc-900">
                        <SlidersHorizontal className="h-4 w-4" />
                        Advance Filters
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        size="sm"
                        className="bg-[#6366F1] hover:bg-[#5558DD] text-white gap-1.5 h-10 rounded-lg px-4 shadow-md shadow-indigo-100"
                        onClick={() => setIsTaskModalOpen(true)}
                    >
                        <Plus className="h-4 w-4" />
                        Add New
                    </Button>
                </div>
            </div>
        </div>
    );
}
