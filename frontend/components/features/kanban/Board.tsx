'use client'
import { useEffect, useState } from "react";
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";
import { getTasks, updateTask, deleteTask, Task } from "@/api/tasks";

export function KanbanBoard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initial fetch
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data.tasks);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getTasksByStatus = (status: string) => {
        return tasks.filter(task => task.status === status);
    };

    const handleDelete = async (taskId: number) => {
        // Optimistic update
        setTasks(prev => prev.filter(t => t.id !== taskId));
        try {
            await deleteTask(taskId);
        } catch (error) {
            console.error("Failed to delete task:", error);
            fetchTasks();
        }
    };

    const handleStatusChange = async (taskId: number, newStatus: string) => {
        // Optimistic update
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
        try {
            await updateTask(taskId, { status: newStatus });
        } catch (error) {
            console.error("Failed to update status:", error);
            fetchTasks();
        }
    };

    return (
        <div className="flex h-full flex-1 gap-4 overflow-x-auto p-8 bg-[#F5F5F7]">
            {/* Pending Column */}
            <Column title="Pending" count={getTasksByStatus("Pending").length} color="bg-zinc-300">
                {getTasksByStatus("Pending").map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        priority={task.priority as any}
                        assigneeName={task.assignee_name}
                        assigneeAvatar={task.assignee_avatar}
                        onDelete={() => handleDelete(task.id)}
                        onStatusChange={(status) => handleStatusChange(task.id, status)}
                    />
                ))}
            </Column>

            {/* In Progress Column */}
            <Column title="In Progress" count={getTasksByStatus("In Progress").length} color="bg-yellow-400">
                {getTasksByStatus("In Progress").map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        priority={task.priority as any}
                        assigneeName={task.assignee_name}
                        assigneeAvatar={task.assignee_avatar}
                        onDelete={() => handleDelete(task.id)}
                        onStatusChange={(status) => handleStatusChange(task.id, status)}
                    />
                ))}
            </Column>

            {/* Completed Column */}
            <Column title="Completed" count={getTasksByStatus("Completed").length} color="bg-green-500">
                {getTasksByStatus("Completed").map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        priority={task.priority as any}
                        assigneeName={task.assignee_name}
                        assigneeAvatar={task.assignee_avatar}
                        onDelete={() => handleDelete(task.id)}
                        onStatusChange={(status) => handleStatusChange(task.id, status)}
                    />
                ))}
            </Column>

            {/* Launched Column */}
            <Column title="Launched" count={getTasksByStatus("Launched").length} color="bg-[#6366F1]">
                {getTasksByStatus("Launched").map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        priority={task.priority as any}
                        assigneeName={task.assignee_name}
                        assigneeAvatar={task.assignee_avatar}
                        onDelete={() => handleDelete(task.id)}
                        onStatusChange={(status) => handleStatusChange(task.id, status)}
                    />
                ))}
            </Column>
        </div>
    );
}
