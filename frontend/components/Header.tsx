'use client'

import { Search, Bell } from 'lucide-react'
import { Input } from './ui/input'
import { Avatar } from './ui/avatar'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
              <span className="text-lg font-bold text-white">T</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">TaskBoard</span>
          </div>
        </div>

        {/* Search Bar - Centered */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative rounded-lg p-2 hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User Avatar */}
          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
            alt="User"
            className="h-9 w-9 ring-2 ring-gray-200"
          />
        </div>
      </div>
    </header>
  )
}
