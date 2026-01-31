'use client'
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createTask } from "@/api/tasks";

// Static users for now as per requirements
const STATIC_USERS = [
    { id: 1, name: "Alice", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { id: 2, name: "Bob", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { id: 3, name: "Charlie", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { id: 4, name: "David", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
];

const STATUSES = ["Pending", "In Progress", "Completed", "Launched"];
const PRIORITIES = ["Low", "Normal", "High"];

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "",
        priority: "Normal",
        assigneeId: "" as string,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const assignee = STATIC_USERS.find(u => u.id.toString() === formData.assigneeId);

            const payload = {
                title: formData.title,
                description: formData.description,
                status: formData.status,
                priority: formData.priority,
                assignee_name: assignee ? assignee.name : null,
                assignee_avatar: assignee ? assignee.avatar : null,
                priority: formData.priority
            };

            await createTask(payload);

            // Success
            onClose();
            // Reset form
            setFormData({
                title: "",
                description: "",
                status: "",
                priority: "Normal",
                assigneeId: "",
            });
            // Ideally trigger a refresh here

        } catch (err) {
            setError("Failed to create task. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Task"
            className="sm:max-w-[500px]"
        >
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-zinc-700">
                        Task Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="title"
                        required
                        placeholder="e.g. Redesign Homepage"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="bg-white"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-zinc-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={3}
                        className="flex w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Add details about this task..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Status */}
                    <div className="space-y-2">
                        <label htmlFor="status" className="text-sm font-medium text-zinc-700">
                            Status <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                id="status"
                                className={cn(
                                    "flex h-10 w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600",
                                    formData.status === "" ? "text-zinc-500" : "text-zinc-900"
                                )}
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                required
                            >
                                <option value="" disabled>Select Status</option>
                                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-zinc-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Priority */}
                    <div className="space-y-2">
                        <label htmlFor="priority" className="text-sm font-medium text-zinc-700">
                            Priority
                        </label>
                        <div className="relative">
                            <select
                                id="priority"
                                className={cn(
                                    "flex h-10 w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600",
                                    "text-zinc-900"
                                )}
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            >
                                {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-zinc-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Assignee */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">
                        Assignee
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {STATIC_USERS.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => setFormData({ ...formData, assigneeId: user.id.toString() })}
                                className={cn(
                                    "flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-all hover:bg-zinc-50",
                                    formData.assigneeId === user.id.toString()
                                        ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600"
                                        : "border-zinc-200"
                                )}
                            >
                                <Avatar src={user.avatar} fallback={user.name[0]} className="h-8 w-8" />
                                <span className="text-sm font-medium text-zinc-700">{user.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                    <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-[#6366F1] hover:bg-[#5558DD] text-white min-w-[100px]"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Task"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
