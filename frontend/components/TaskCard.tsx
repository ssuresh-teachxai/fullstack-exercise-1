'use client'

import { Calendar, Flag, Edit2, Trash2 } from 'lucide-react'
import { Avatar } from './ui/avatar'
import { Task } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const priorityColors = {
    high: 'text-red-600 bg-red-50',
    normal: 'text-blue-600 bg-blue-50',
  }

  return (
    <div className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all">
      {/* Header with Actions */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 flex-1">
          {task.title}
        </h3>
        
        {/* Action Buttons - Show on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit?.(task)
            }}
            className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-purple-600 transition-colors"
            title="Edit task"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.(task)
            }}
            className="p-1 rounded hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
            title="Delete task"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Assignees */}
        <div className="flex -space-x-2">
          {task.assignees.slice(0, 3).map((assignee) => (
            <Avatar
              key={assignee.id}
              src={assignee.avatar}
              alt={assignee.name}
              className="h-6 w-6 ring-2 ring-white"
            />
          ))}
          {task.assignees.length > 3 && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-2 ring-white text-xs font-medium text-gray-600">
              +{task.assignees.length - 3}
            </div>
          )}
        </div>

        {/* Due Date & Priority */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <div
            className={cn(
              'flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium',
              priorityColors[task.priority]
            )}
          >
            <Flag className="h-3 w-3" />
            <span className="capitalize">{task.priority}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
