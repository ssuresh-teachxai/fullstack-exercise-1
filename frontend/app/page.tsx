'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { FilterBar } from '@/components/FilterBar'
import { KanbanBoard } from '@/components/KanbanBoard'
import { TaskDialog } from '@/components/TaskDialog'
import { DeleteConfirmation } from '@/components/DeleteConfirmation'
import { useFilters } from '@/context/FilterContext'
import { Task } from '@/lib/types'
import { applyFilters } from '@/lib/filterUtils'
import * as api from '@/lib/api'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
  const { filters } = useFilters()

  // Load tasks on mount
  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.getTasks()
      setTasks(data)
    } catch (err) {
      setError('Failed to load tasks. Make sure the backend is running.')
      console.error('Error loading tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = () => {
    setSelectedTask(null)
    setIsTaskDialogOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setIsTaskDialogOpen(true)
  }

  const handleDeleteTask = (task: Task) => {
    setTaskToDelete(task)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (selectedTask?.id) {
        // Update existing task
        const updated = await api.updateTask(selectedTask.id, taskData)
        setTasks(prev => 
          prev.map(t => t.id === selectedTask.id ? updated : t)
        )
      } else {
        // Create new task
        const newTask = await api.createTask({
          title: taskData.title || '',
          description: taskData.description,
          status: taskData.status || 'pending',
          priority: taskData.priority || 'normal',
          dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
          assignees: taskData.assignees || [],
        })
        setTasks(prev => [...prev, newTask])
      }
    } catch (err) {
      console.error('Error saving task:', err)
      alert('Failed to save task. Please try again.')
    }
  }

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      try {
        await api.deleteTask(taskToDelete.id)
        setTasks(prev => prev.filter(t => t.id !== taskToDelete.id))
        setTaskToDelete(null)
      } catch (err) {
        console.error('Error deleting task:', err)
        alert('Failed to delete task. Please try again.')
      }
    }
  }

  // Apply filters to tasks
  const filteredTasks = applyFilters(tasks, filters)

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-hidden">
          <FilterBar onAddTask={handleAddTask} />
          {loading ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading tasks...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center max-w-md">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={loadTasks}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <KanbanBoard 
              tasks={filteredTasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </main>
      </div>

      {/* Dialogs */}
      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        task={selectedTask}
        onSave={handleSaveTask}
      />

      <DeleteConfirmation
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        taskTitle={taskToDelete?.title || ''}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
