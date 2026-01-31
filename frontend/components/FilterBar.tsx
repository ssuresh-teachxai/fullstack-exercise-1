'use client'

import { Pencil, Share2, Zap, ChevronDown, Plus, Filter, X } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar } from './ui/avatar'
import { cn } from '@/lib/utils'
import { useFilters } from '@/context/FilterContext'
import { useState, useEffect } from 'react'
import * as api from '@/lib/api'
import { User } from '@/lib/types'

const tabs = ['Overview', 'List', 'Board', 'Calendar', 'Files']

const projectMembers = [
  { id: '1', name: 'John', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: '2', name: 'Jane', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: '3', name: 'Mike', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
  { id: '4', name: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
]

interface FilterBarProps {
  onAddTask?: () => void
}

export function FilterBar({ onAddTask }: FilterBarProps) {
  const { filters, setDueDate, setAssignee, setPriority, clearFilters } = useFilters()
  const [users, setUsers] = useState<User[]>([])


useEffect(() => {
    const loadUsers = async () => {
        try {
        const data = await api.getUsers()
        setUsers(data)
        } catch (err) {
        console.error('Error loading users:', err)
        }
        }
    loadUsers()
    }, [])

  const hasActiveFilters = filters.dueDate || filters.assignee || filters.priority

  return (
    <div className="border-b bg-white">
      {/* Project Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">Website Redesign</h1>
            <button className="rounded p-1 hover:bg-gray-100 transition-colors">
              <Pencil className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Avatar Stack */}
            <div className="flex -space-x-2">
              {projectMembers.map((member) => (
                <Avatar
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="h-8 w-8 ring-2 ring-white"
                />
              ))}
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-2 ring-white hover:bg-gray-200 transition-colors">
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Action Buttons */}
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4" />
              Automation
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <div className="flex items-center gap-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={cn(
                'relative px-1 py-3 text-sm font-medium transition-colors',
                tab === 'Board'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              {tab}
              {tab === 'Board' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DueDateFilter value={filters.dueDate} onChange={setDueDate} />
          <AssigneeFilter value={filters.assignee} onChange={setAssignee} users={users} />
          <PriorityFilter value={filters.priority} onChange={setPriority} />
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-gray-600"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        <Button
          onClick={onAddTask}
          size="sm"
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>
    </div>
  )
}

function DueDateFilter({ value, onChange }: { value: string | null; onChange: (value: string | null) => void }) {
  const options = [
    { value: 'overdue', label: 'Overdue' },
    { value: 'today', label: 'Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
  ]

  return (
    <div className="relative">
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className={cn(
          "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors cursor-pointer appearance-none pr-8",
          value ? "border-purple-300 bg-purple-50 text-purple-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"
        )}
      >
        <option value="">Due Date</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown className="h-4 w-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  )
}

function AssigneeFilter({ value, onChange, users }: { value: string | null; onChange: (value: string | null) => void; users: User[] }) {
  return (
    <div className="relative">
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className={cn(
          "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors cursor-pointer appearance-none pr-8",
          value ? "border-purple-300 bg-purple-50 text-purple-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"
        )}
      >
        <option value="">Assignee</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <ChevronDown className="h-4 w-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  )
}

function PriorityFilter({ value, onChange }: { value: string | null; onChange: (value: string | null) => void }) {
  const options = [
    { value: 'high', label: 'High Priority' },
    { value: 'normal', label: 'Normal Priority' },
  ]

  return (
    <div className="relative">
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className={cn(
          "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors cursor-pointer appearance-none pr-8",
          value ? "border-purple-300 bg-purple-50 text-purple-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"
        )}
      >
        <option value="">Priority</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown className="h-4 w-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  )
}
