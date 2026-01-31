'use client'
import { useEffect, useState } from "react";
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";
import { getTasks, Task } from "@/api/tasks";

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

    return (
        <div className="flex h-full flex-1 gap-4 overflow-x-auto p-8 bg-[#F5F5F7]">
            {/* Pending Column */}
            <Column title="Pending" count={getTasksByStatus("Pending").length} color="bg-zinc-300">
                {getTasksByStatus("Pending").map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        priority="Normal" // Default as backend doesn't support yet
                        assigneeName={task.assignee_name}
                        assigneeAvatar={task.assignee_avatar}
                    />
                ))}
            </Column>

            {/* In Progress Column */}
            <Column title="In Progress" count={getTasksByStatus("In Progress").length} color="bg-yellow-400">
                {getTasksByStatus("In Progress").map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        priority="Normal"
                        assigneeName={task.assignee_name}
                        assigneeAvatar={task.assignee_avatar}
                    />
                ))}
            </Column>

            {/* Completed Column */}
            <Column title="Completed" count={getTasksByStatus("Completed").length} color="bg-green-500">
                {getTasksByStatus("Completed").map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        priority="Normal"
                        assigneeName={task.assignee_name}
                        assigneeAvatar={task.assignee_avatar}
                    />
                ))}
            </Column>

            {/* Launched Column */}
            <Column title="Launched" count={getTasksByStatus("Launched").length} color="bg-[#6366F1]">
                {getTasksByStatus("Launched").map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        priority="Normal"
                        assigneeName={task.assignee_name}
                        assigneeAvatar={task.assignee_avatar}
                    />
                ))}
            </Column>
        </div>
    );
}
