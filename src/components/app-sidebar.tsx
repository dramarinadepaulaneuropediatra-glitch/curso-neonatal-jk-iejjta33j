import { Link, useLocation } from 'react-router-dom'
import { BookOpen, CheckCircle, Circle, Home, Lock, Stethoscope } from 'lucide-react'
import { COURSE_DATA } from '@/data/course'
import { useCourse } from '@/context/course-context'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export function AppSidebar() {
  const { completedLessons } = useCourse()
  const location = useLocation()

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-4 flex items-center gap-3 border-b border-border/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Stethoscope className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm leading-tight text-primary">Curso Neonatal</span>
          <span className="text-xs text-muted-foreground">Hospital Júlia Kubitschek</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/'}>
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    <span>Visão Geral</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Módulos do Curso</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {COURSE_DATA.map((module, mIndex) => {
                // Determine if module is locked (previous module not completed)
                // For simplicity, module 1 is always unlocked. Module N is unlocked if Module N-1 is 100% completed.
                let isLocked = false
                if (mIndex > 0) {
                  const prevModuleLessons = COURSE_DATA[mIndex - 1].lessons.map((l) => l.id)
                  const prevCompleted = prevModuleLessons.every((id) =>
                    completedLessons.includes(id),
                  )
                  isLocked = !prevCompleted
                }

                const moduleCompleted = module.lessons.every((l) => completedLessons.includes(l.id))
                const moduleInProgress =
                  !moduleCompleted && module.lessons.some((l) => completedLessons.includes(l.id))

                return (
                  <SidebarMenuItem key={module.id}>
                    <SidebarMenuButton className="font-medium flex justify-between items-center w-full">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate max-w-[160px]">{module.title}</span>
                      </div>
                      {isLocked ? (
                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : moduleCompleted ? (
                        <CheckCircle className="h-3.5 w-3.5 text-primary" />
                      ) : null}
                    </SidebarMenuButton>
                    {!isLocked && (
                      <SidebarMenuSub>
                        {module.lessons.map((lesson) => {
                          const isLessonCompleted = completedLessons.includes(lesson.id)
                          const isActive = location.pathname === `/lesson/${lesson.id}`

                          return (
                            <SidebarMenuSubItem key={lesson.id}>
                              <SidebarMenuSubButton asChild isActive={isActive}>
                                <Link
                                  to={`/lesson/${lesson.id}`}
                                  className="flex justify-between items-center"
                                >
                                  <span className="truncate">{lesson.title}</span>
                                  {isLessonCompleted ? (
                                    <CheckCircle className="h-3 w-3 text-primary shrink-0" />
                                  ) : (
                                    <Circle className="h-3 w-3 text-muted-foreground/40 shrink-0" />
                                  )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
