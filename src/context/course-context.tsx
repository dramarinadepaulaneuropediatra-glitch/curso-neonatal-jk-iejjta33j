import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getMyProgress, createProgress, updateProgress } from '@/services/course_progress'
import { ALL_LESSONS } from '@/data/course'

interface CourseContextType {
  completedLessons: string[]
  markCompleted: (id: string) => void
  progressPercentage: number
  lastAccessedLesson: string | null
  setLastAccessed: (id: string) => void
  quizScore: number
  quizAttempts: number
  passed: boolean
  submitQuiz: (score: number, type: string) => void
}

const CourseContext = createContext<CourseContextType | undefined>(undefined)

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [progressId, setProgressId] = useState<string | null>(null)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [lastAccessedLesson, setLastAccessedLesson] = useState<string | null>(
    localStorage.getItem('hjk_last_accessed'),
  )
  const [quizScore, setQuizScore] = useState(0)
  const [quizAttempts, setQuizAttempts] = useState(0)
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    if (user) {
      getMyProgress(user.id).then((res) => {
        if (res) {
          setProgressId(res.id)
          setCompletedLessons(res.completed_lessons || [])
          setQuizScore(res.quiz_score || 0)
          setQuizAttempts(res.quiz_attempts || 0)
          setPassed(res.passed || false)
        } else {
          createProgress({
            user_id: user.id,
            completed_lessons: [],
            quiz_score: 0,
            quiz_attempts: 0,
            passed: false,
          }).then((newRes) => {
            setProgressId(newRes.id)
          })
        }
      })
    }
  }, [user])

  useEffect(() => {
    if (lastAccessedLesson) localStorage.setItem('hjk_last_accessed', lastAccessedLesson)
  }, [lastAccessedLesson])

  const markCompleted = (id: string) => {
    if (!completedLessons.includes(id)) {
      const newLessons = [...completedLessons, id]
      setCompletedLessons(newLessons)
      if (progressId) updateProgress(progressId, { completed_lessons: newLessons })
    }
  }

  const setLastAccessed = (id: string) => setLastAccessedLesson(id)

  const submitQuiz = (score: number, type: string) => {
    const newAttempts = quizAttempts + 1
    const isPassed = score >= 70
    setQuizScore(score)
    setQuizAttempts(newAttempts)
    setPassed(isPassed)
    if (progressId)
      updateProgress(progressId, {
        quiz_score: score,
        quiz_attempts: newAttempts,
        passed: isPassed,
        quiz_type: type,
      })
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
        quizScore,
        quizAttempts,
        passed,
        submitQuiz,
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
