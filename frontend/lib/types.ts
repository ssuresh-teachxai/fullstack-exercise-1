export interface User {
  id: string
  name: string
  avatar?: string
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'launched'
export type TaskPriority = 'normal' | 'high'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  assignees: User[]
  createdAt?: string
  updatedAt?: string
}

export interface CreateTaskInput {
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  assignees?: User[]
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  dueDate?: string
  assignees?: User[]
}
