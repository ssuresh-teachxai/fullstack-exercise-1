import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Search, Bell, Activity } from "lucide-react";

export function Header() {
    return (
        <header className="flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white px-8">
            <div className="flex items-center gap-2 md:hidden">
                {/* Mobile logo placeholder */}
                <span className="font-bold text-lg">TaskBoard</span>
            </div>

            {/* Center: Search - Centered in the available space */}
            <div className="flex-1 flex justify-center max-w-2xl mx-auto">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                        placeholder="Search"
                        className="pl-11 h-11 rounded-full bg-zinc-100 border-transparent focus:bg-white transition-all text-sm placeholder:text-zinc-500"
                    />
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-4">
                {/* Icons */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full text-zinc-500 hover:bg-zinc-100">
                        <Activity className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="relative rounded-full text-zinc-500 hover:bg-zinc-100">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
                    </Button>
                </div>

                {/* Profile */}
                <Avatar
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    fallback="AM"
                    className="h-10 w-10 border-2 border-white shadow-sm"
                />
            </div>
        </header>
    );
}
