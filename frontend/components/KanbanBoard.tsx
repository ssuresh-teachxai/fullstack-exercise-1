'use client'

import { Task, TaskStatus } from '@/lib/types'
import { TaskCard } from './TaskCard'
import { cn } from '@/lib/utils'

interface KanbanBoardProps {
  tasks: Task[]
  onEditTask?: (task: Task) => void
  onDeleteTask?: (task: Task) => void
}

const columns: {
  status: TaskStatus
  label: string
  color: string
}[] = [
  { status: 'pending', label: 'Pending', color: 'bg-gray-500' },
  { status: 'in_progress', label: 'In Progress', color: 'bg-yellow-500' },
  { status: 'completed', label: 'Completed', color: 'bg-green-500' },
  { status: 'launched', label: 'Launched', color: 'bg-purple-600' },
]

export function KanbanBoard({ tasks, onEditTask, onDeleteTask }: KanbanBoardProps) {
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status)
  }

  return (
    <div className="flex-1 overflow-x-auto bg-gray-50 p-6">
      <div className="flex gap-6 min-w-max">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status)
          return (
            <div key={column.status} className="flex flex-col w-80">
              {/* Column Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn('h-3 w-3 rounded-full', column.color)} />
                  <h2 className="font-semibold text-gray-900">{column.label}</h2>
                  <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                    {columnTasks.length}
                  </span>
                </div>
              </div>

              {/* Tasks */}
              <div className="flex-1 space-y-3">
                {columnTasks.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                  />
                ))}
                {columnTasks.length === 0 && (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                    <p className="text-sm text-gray-500">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
