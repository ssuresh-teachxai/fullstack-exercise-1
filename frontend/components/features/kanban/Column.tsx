import { MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ColumnProps {
    title: string;
    count: number;
    color: string; // e.g., "bg-yellow-500" - used for the dot
    children: React.ReactNode;
}

export function Column({ title, count, color, children }: ColumnProps) {
    return (
        <div className="flex h-full min-w-[300px] w-[300px] flex-col gap-4">
            {/* Column Header */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2.5">
                    {/* Dot Indicator */}
                    <div className={cn("h-2.5 w-2.5 rounded-full", color)} />
                    <h3 className="font-bold text-zinc-900 text-[15px]">{title}</h3>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-200/60 px-2 text-xs font-semibold text-zinc-600">
                        {count}
                    </span>
                </div>
                <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Cards Container */}
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-4 px-1 scrollbar-hide">
                {children}
                <button className="flex items-center gap-2 text-zinc-400 hover:text-zinc-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/50 transition-colors border border-dashed border-zinc-300 hover:border-zinc-400">
                    <Plus className="h-4 w-4" />
                    New
                </button>
            </div>
        </div>
    );
}
