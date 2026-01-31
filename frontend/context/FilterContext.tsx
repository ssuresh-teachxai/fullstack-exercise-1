'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type FilterType = {
  dueDate: string | null
  assignee: string | null
  priority: string | null
  search: string
}

type FilterContextType = {
  filters: FilterType
  setDueDate: (value: string | null) => void
  setAssignee: (value: string | null) => void
  setPriority: (value: string | null) => void
  setSearch: (value: string) => void
  clearFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterType>({
    dueDate: null,
    assignee: null,
    priority: null,
    search: '',
  })

  const setDueDate = (value: string | null) => {
    setFilters(prev => ({ ...prev, dueDate: value }))
  }

  const setAssignee = (value: string | null) => {
    setFilters(prev => ({ ...prev, assignee: value }))
  }

  const setPriority = (value: string | null) => {
    setFilters(prev => ({ ...prev, priority: value }))
  }

  const setSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }))
  }

  const clearFilters = () => {
    setFilters({
      dueDate: null,
      assignee: null,
      priority: null,
      search: '',
    })
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        setDueDate,
        setAssignee,
        setPriority,
        setSearch,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}
