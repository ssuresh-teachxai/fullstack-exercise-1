import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Calendar, MoreHorizontal, MessageSquare, Flag } from "lucide-react";

interface TaskCardProps {
    title: string;
    priority?: "Low" | "Normal" | "High";
    dueDate?: string;
    comments?: number;
    assigneeName?: string | null;
    assigneeAvatar?: string | null;
    isOverdue?: boolean;
}

export function TaskCard({ title, priority = "Normal", dueDate, comments = 0, isOverdue, assigneeName, assigneeAvatar }: TaskCardProps) {
    return (
        <div className="group relative flex flex-col gap-3 rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm hover:shadow-lg transition-all cursor-grab active:cursor-grabbing">

            {/* Header: Title & Menu */}
            <div className="flex items-start justify-between">
                <h3 className="font-semibold text-zinc-900 leading-snug text-[15px]">{title}</h3>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-zinc-900 -mr-2 -mt-1 p-1">
                    <MoreHorizontal className="h-4 w-4" />
                </button>
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
