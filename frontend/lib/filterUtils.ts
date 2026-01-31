import { Task } from './types'
import { FilterType } from '@/context/FilterContext'

export function applyFilters(tasks: Task[], filters: FilterType): Task[] {
  return tasks.filter(task => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch = 
        task.title.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }

    // Priority filter
    if (filters.priority && task.priority !== filters.priority) {
      return false
    }

    // Assignee filter
    if (filters.assignee) {
      const hasAssignee = task.assignees?.some(
        assignee => assignee.id.toString() === filters.assignee
      )
      if (!hasAssignee) return false
    }

    // Due date filter
    if (filters.dueDate) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const taskDate = new Date(task.dueDate)
      taskDate.setHours(0, 0, 0, 0)

      switch (filters.dueDate) {
        case 'overdue':
          if (taskDate >= today) return false
          break
        case 'today':
          if (taskDate.getTime() !== today.getTime()) return false
          break
        case 'this-week':
          const weekFromNow = new Date(today)
          weekFromNow.setDate(weekFromNow.getDate() + 7)
          if (taskDate < today || taskDate > weekFromNow) return false
          break
        case 'this-month':
          if (
            taskDate.getMonth() !== today.getMonth() ||
            taskDate.getFullYear() !== today.getFullYear()
          ) return false
          break
      }
    }

    return true
  })
}
