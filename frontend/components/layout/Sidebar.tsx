'use client'
import { Button } from "@/components/ui/Button";
import {
    LayoutDashboard,
    Save,
    Users,
    BarChart2,
    Settings,
    Plus,
    ChevronDown,
    ChevronRight,
    FolderMinus,
    Folder,
    Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AddTaskModal } from "@/components/features/kanban/AddTaskModal";

const NAV_ITEMS: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
    badge?: number;
}> = [
        { icon: LayoutDashboard, label: "Dashboard", href: "#" },
        { icon: Save, label: "Saved Drafts", href: "#" },
        { icon: Users, label: "Teams", href: "#" },
        { icon: BarChart2, label: "Analytics", href: "#" },
        { icon: Settings, label: "Settings", href: "#" },
    ];

export function Sidebar({ className }: { className?: string }) {
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

    return (
        <div className={cn("flex h-screen w-[260px] flex-col border-r border-zinc-200 bg-white", className)}>
            {/* TaskBoard Logo */}
            <div className="flex h-16 items-center px-5 border-b border-zinc-200">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366F1] text-white">
                        <Layers className="h-4 w-4" />
                    </div>
                    <span className="text-base font-bold text-zinc-900">TaskBoard</span>
                </div>
            </div>

            {/* Workspace Selector */}
            <div className="flex h-14 items-center px-5">
                <button className="flex items-center gap-3 w-full hover:bg-zinc-50 p-2 rounded-lg transition-colors -ml-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                        <div className="h-4 w-4 rounded-full border-2 border-current" />
                    </div>
                    <div className="flex-1 text-left">
                        <div className="text-sm font-bold text-zinc-900">OnPoint Studio</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-hide">
                {/* Add New Button */}
                <Button
                    className="w-full justify-center gap-2 bg-[#6366F1] hover:bg-[#5558DD] text-white rounded-xl shadow-lg shadow-indigo-100 h-11 mb-8 font-medium"
                    onClick={() => setIsAddTaskOpen(true)}
                >
                    <Plus className="h-5 w-5" />
                    Add New
                </Button>

                {/* Main Navigation */}
                <nav className="space-y-1 mb-10">
                    {NAV_ITEMS.map((item) => (
                        <Button
                            key={item.label}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-4 px-2 font-medium text-zinc-500 hover:text-zinc-900 hover:bg-transparent h-10",
                                item.label === "Dashboard" && ""
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                            {item.badge && (
                                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                    {item.badge}
                                </span>
                            )}
                        </Button>
                    ))}
                </nav>

                {/* Projects */}
                <div className="mb-2">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-500 mb-4 px-2">
                        <span>ADD PROJECTS</span>
                        <Plus className="h-4 w-4 cursor-pointer hover:text-zinc-900" />
                    </div>

                    <div className="space-y-1">
                        {/* Main Project (Expanded) */}
                        <div className="flex flex-col gap-1">
                            <Button variant="ghost" className="w-full justify-start gap-3 px-0 hover:bg-transparent text-zinc-700 font-semibold">
                                <ChevronDown className="h-4 w-4 text-zinc-400" />
                                <FolderMinus className="h-5 w-5 text-zinc-400" />
                                <span className="truncate">Main Project</span>
                            </Button>

                            {/* Tree Items */}
                            <div className="pl-4 border-l border-zinc-100 ml-2 space-y-1">
                                <Button variant="ghost" className="w-full justify-start gap-3 px-3 h-10 bg-indigo-50 text-indigo-600 rounded-lg font-medium">
                                    <span className="h-2 w-2 rounded-full border-2 border-indigo-600" />
                                    Design Project
                                </Button>
                                <Button variant="ghost" className="w-full justify-start gap-3 px-3 h-10 text-zinc-500 hover:text-zinc-900 font-medium">
                                    <span className="h-2 w-2 rounded-full border-2 border-zinc-400" />
                                    Carl UI/UX
                                </Button>
                                <Button variant="ghost" className="w-full justify-start gap-3 px-3 h-10 text-zinc-500 hover:text-zinc-900 font-medium">
                                    <span className="h-2 w-2 rounded-full border-2 border-zinc-400" />
                                    Hajime Illustrations
                                </Button>
                            </div>
                        </div>

                        {/* Other Projects (Collapsed) */}
                        <Button variant="ghost" className="w-full justify-start gap-3 px-0 hover:bg-transparent text-zinc-600 font-medium mt-2">
                            <ChevronRight className="h-4 w-4 text-zinc-400" />
                            <Folder className="h-5 w-5 text-zinc-400" />
                            <span className="truncate">Landing Page Project</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 px-0 hover:bg-transparent text-zinc-600 font-medium">
                            <ChevronRight className="h-4 w-4 text-zinc-400" />
                            <Folder className="h-5 w-5 text-zinc-400" />
                            <span className="truncate">Yellow Branding</span>
                        </Button>

                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-5 flex gap-3">
                <Button variant="secondary" className="flex-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-none font-semibold">
                    Invite Team
                </Button>
                <Button variant="outline" className="px-3 border-zinc-200 text-zinc-600">
                    Help
                </Button>
            </div>

            <AddTaskModal
                isOpen={isAddTaskOpen}
                onClose={() => setIsAddTaskOpen(false)}
            />
        </div>
    );
}
