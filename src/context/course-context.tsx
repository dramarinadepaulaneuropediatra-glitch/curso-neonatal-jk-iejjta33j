import React, { createContext, useContext, useState, useEffect } from 'react'
import { COURSE_DATA, ALL_LESSONS } from '@/data/course'

interface CourseContextType {
  completedLessons: string[]
  markCompleted: (id: string) => void
  progressPercentage: number
  lastAccessedLesson: string | null
  setLastAccessed: (id: string) => void
}

const CourseContext = createContext<CourseContextType | undefined>(undefined)

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('hjk_completed_lessons')
    return saved ? JSON.parse(saved) : []
  })

  const [lastAccessedLesson, setLastAccessedLesson] = useState<string | null>(() => {
    return localStorage.getItem('hjk_last_accessed')
  })

  useEffect(() => {
    localStorage.setItem('hjk_completed_lessons', JSON.stringify(completedLessons))
  }, [completedLessons])

  useEffect(() => {
    if (lastAccessedLesson) {
      localStorage.setItem('hjk_last_accessed', lastAccessedLesson)
    }
  }, [lastAccessedLesson])

  const markCompleted = (id: string) => {
    setCompletedLessons((prev) => {
      if (!prev.includes(id)) return [...prev, id]
      return prev
    })
  }

  const setLastAccessed = (id: string) => {
    setLastAccessedLesson(id)
  }

  const progressPercentage = Math.round((completedLessons.length / ALL_LESSONS.length) * 100) || 0

  return (
    <CourseContext.Provider
      value={{
        completedLessons,
        markCompleted,
        progressPercentage,
        lastAccessedLesson,
        setLastAccessed,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}

export function useCourse() {
  const context = useContext(CourseContext)
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider')
  }
  return context
}
