'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string | null
  status: 'TODO' | 'IN_PROGRESS' | 'WAITING' | 'COMPLETED' | 'SKIPPED'
  dueDate: string | null
  category: string
}

interface TaskListProps {
  tasks: Task[]
  ceremonyId: string
}

export function TaskList({ tasks, ceremonyId }: TaskListProps) {
  const router = useRouter()
  const [expandedTask, setExpandedTask] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const toggleTask = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'COMPLETED' ? 'TODO' : 'COMPLETED'
    setUpdating(taskId)

    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      router.refresh()
    } catch (error) {
      console.error('Error updating task:', error)
    } finally {
      setUpdating(null)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
    })
  }

  const isOverdue = (dateStr: string | null) => {
    if (!dateStr) return false
    return new Date(dateStr) < new Date()
  }

  return (
    <div className="divide-y">
      {tasks.map((task) => {
        const isCompleted = task.status === 'COMPLETED'
        const isExpanded = expandedTask === task.id
        const overdue = !isCompleted && isOverdue(task.dueDate)

        return (
          <div key={task.id} className="py-3">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={isCompleted}
                disabled={updating === task.id}
                onCheckedChange={() => toggleTask(task.id, task.status)}
                className="mt-1"
              />
              
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                      {task.title}
                    </span>
                    {task.description && (
                      isExpanded 
                        ? <ChevronUp className="h-4 w-4 text-slate-400" />
                        : <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                  
                  {task.dueDate && (
                    <div className={`flex items-center gap-1 text-sm mt-1 ${
                      overdue ? 'text-red-600' : 'text-slate-500'
                    }`}>
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(task.dueDate)}</span>
                      {overdue && <Badge variant="destructive" className="text-xs ml-1">Te laat</Badge>}
                    </div>
                  )}
                </button>
                
                {isExpanded && task.description && (
                  <p className="text-sm text-slate-600 mt-2 pl-0">
                    {task.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
