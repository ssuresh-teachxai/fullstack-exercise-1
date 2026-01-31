import { Task, CreateTaskInput, UpdateTaskInput, User } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Helper to convert frontend format to backend format
function toBackendTask(task: CreateTaskInput | UpdateTaskInput) {
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    due_date: task.dueDate,
    assignee_ids: task.assignees?.map(a => parseInt(a.id)) || []
  }
}

// Helper to convert backend format to frontend format
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromBackendTask(backendTask: any): Task {
  return {
    id: backendTask.id.toString(),
    title: backendTask.title,
    description: backendTask.description,
    status: backendTask.status,
    priority: backendTask.priority,
    dueDate: backendTask.due_date,
    assignees: backendTask.assignees || [],
    createdAt: backendTask.created_at,
    updatedAt: backendTask.updated_at
  }
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tasks`)
  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }
  const data = await response.json()
  return data.map(fromBackendTask)
}

export async function createTask(task: CreateTaskInput): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toBackendTask(task)),
  })
  if (!response.ok) {
    throw new Error('Failed to create task')
  }
  const data = await response.json()
  return fromBackendTask(data)
}

export async function updateTask(id: string, updates: UpdateTaskInput): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toBackendTask(updates)),
  })
  if (!response.ok) {
    throw new Error('Failed to update task')
  }
  const data = await response.json()
  return fromBackendTask(data)
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete task')
  }
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/tasks/users/all`)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  const data = await response.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((user: any) => ({
    id: user.id.toString(),
    name: user.name,
    avatar: user.avatar
  }))
}
