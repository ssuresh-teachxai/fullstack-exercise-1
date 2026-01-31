export interface CreateTaskPayload {
    title: string;
    description: string;
    status: string;
    assignee_name: string | null;
    assignee_avatar: string | null;
}

export interface Task {
    id: number;
    title: string;
    description: string | null;
    status: string;
    assignee_name: string | null;
    assignee_avatar: string | null;
}

const API_BASE_URL = "http://localhost:8000";

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to create task");
    }

    return response.json();
}

export async function getTasks(): Promise<{ tasks: Task[] }> {
    const response = await fetch(`${API_BASE_URL}/tasks`);

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
}

export async function updateTask(id: number, payload: Partial<Task>): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    return response.json();
}

export async function deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
}
