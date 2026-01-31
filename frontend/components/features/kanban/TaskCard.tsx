'use client'
import { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Calendar, MoreHorizontal, MessageSquare, Flag, Trash2, ArrowRight } from "lucide-react";

interface TaskCardProps {
    title: string;
    priority?: "Low" | "Normal" | "High";
    dueDate?: string;
    comments?: number;
    assigneeName?: string | null;
    assigneeAvatar?: string | null;
    isOverdue?: boolean;
    onDelete?: () => void;
    onStatusChange?: (newStatus: string) => void;
}

export function TaskCard({ title, priority = "Normal", dueDate, comments = 0, isOverdue, assigneeName, assigneeAvatar, onDelete, onStatusChange }: TaskCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className="group relative flex flex-col gap-3 rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm hover:shadow-lg transition-all cursor-grab active:cursor-grabbing">

            {/* Header: Title & Menu */}
            {/* Header: Title & Menu */}
            <div className="flex items-start justify-between relative">
                <h3 className="font-semibold text-zinc-900 leading-snug text-[15px]">{title}</h3>
                <div ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="opacity-100 text-zinc-400 hover:text-zinc-900 -mr-2 -mt-1 p-1 hover:bg-zinc-100 rounded"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 top-8 z-20 w-48 rounded-lg border border-zinc-200 bg-white shadow-xl p-1 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                            <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-2 py-1.5">Move to</div>
                            {["Pending", "In Progress", "Completed", "Launched"].map(status => (
                                <button
                                    key={status}
                                    onClick={() => { onStatusChange?.(status); setIsMenuOpen(false); }}
                                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
                                >
                                    <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
                                    {status}
                                </button>
                            ))}
                            <div className="my-1 border-t border-zinc-100" />
                            <button
                                onClick={() => { onDelete?.(); setIsMenuOpen(false); }}
                                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete Task
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Middle Row: Assignee & Date */}
            <div className="flex items-center gap-3 text-zinc-500">
                <Avatar
                    size="sm"
                    className="h-6 w-6 border-2 border-white text-[10px]"
                    src={assigneeAvatar || undefined}
                    fallback={assigneeName ? assigneeName[0] : "U"}
                />

                {dueDate && (
                    <div className={`flex items-center gap-1.5 text-xs font-medium ${isOverdue ? "text-red-500" : "text-zinc-500"}`}>
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{dueDate}</span>
                        {isOverdue && <span className="bg-red-100 text-red-600 px-1 py-0.5 rounded text-[9px] uppercase tracking-wide font-bold">Overdue</span>}
                    </div>
                )}
            </div>

            {/* Bottom Row: Priority & Metrics */}
            <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                    <Flag className={`h-3.5 w-3.5 ${priority === "High" ? "fill-red-500 text-red-500" : "fill-blue-400 text-blue-400"}`} />
                    <span className="text-xs font-medium text-zinc-500">{priority} Priority</span>
                </div>

                {comments > 0 && (
                    <div className="flex items-center gap-1 text-zinc-400 text-xs">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>{comments}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
