'use client'

import { useState } from 'react'
import {
  ChevronDown,
  Plus,
  LayoutDashboard,
  Inbox,
  Users,
  BarChart3,
  Settings,
  ChevronRight,
  HelpCircle,
  UserPlus,
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

const projects = [
  {
    id: '1',
    name: 'Website Redesign',
    color: 'bg-blue-500',
    subProjects: ['Landing Page', 'Dashboard', 'Mobile App'],
  },
  {
    id: '2',
    name: 'Marketing Campaign',
    color: 'bg-green-500',
    subProjects: ['Social Media', 'Email'],
  },
  {
    id: '3',
    name: 'Product Launch',
    color: 'bg-purple-500',
    subProjects: [],
  },
]

export function Sidebar() {
  const [expandedProjects, setExpandedProjects] = useState<string[]>(['1'])

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  return (
    <aside className="w-72 border-r bg-white flex flex-col h-full">
      {/* Workspace Selector */}
      <div className="p-4 border-b">
        <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-purple-600 to-blue-600 text-xs font-bold text-white">
              OS
            </div>
            <span className="font-medium text-gray-900">OnPoint Studio</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Add New Button */}
      <div className="px-4 pt-4">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" />
          <NavItem icon={Inbox} label="Inbox" badge="3" />
          <NavItem icon={Users} label="Teams" />
          <NavItem icon={BarChart3} label="Analytics" />
          <NavItem icon={Settings} label="Settings" />
        </div>

        {/* Projects Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs font-semibold uppercase text-gray-500">Projects</span>
            <button className="rounded hover:bg-gray-100 p-0.5">
              <Plus className="h-3.5 w-3.5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-1 mt-2">
            {projects.map((project) => (
              <div key={project.id}>
                <button
                  onClick={() => toggleProject(project.id)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 text-gray-400 transition-transform',
                      expandedProjects.includes(project.id) && 'rotate-90'
                    )}
                  />
                  <div className={cn('h-2 w-2 rounded-full', project.color)} />
                  <span className="flex-1 text-left">{project.name}</span>
                </button>

                {expandedProjects.includes(project.id) &&
                  project.subProjects.length > 0 && (
                    <div className="ml-8 mt-1 space-y-1">
                      {project.subProjects.map((sub) => (
                        <button
                          key={sub}
                          className="flex w-full items-center rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="border-t p-4 space-y-2">
        <Button variant="outline" className="w-full justify-start text-gray-700">
          <UserPlus className="h-4 w-4" />
          Invite Team
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-700">
          <HelpCircle className="h-4 w-4" />
          Help
        </Button>
      </div>
    </aside>
  )
}

function NavItem({
  icon: Icon,
  label,
  badge,
  active = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  label: string
  badge?: string
  active?: boolean
}) {
  return (
    <button
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        active
          ? 'bg-purple-50 text-purple-600 font-medium'
          : 'text-gray-700 hover:bg-gray-100'
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
          {badge}
        </Badge>
      )}
    </button>
  )
}
