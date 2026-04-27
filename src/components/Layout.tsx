import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Progress } from '@/components/ui/progress'
import { useCourse } from '@/context/course-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'

export default function Layout() {
  const { progressPercentage } = useCourse()
  const { signOut, user, isAdmin } = useAuth()
  const navigate = useNavigate()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
          <div className="flex items-center gap-4 flex-1">
            <SidebarTrigger className="-ml-2" />
            <div className="hidden sm:flex flex-col w-full max-w-sm gap-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-muted-foreground">Progresso do Curso</span>
                <span className="text-primary">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-1.5" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:hidden flex items-center gap-2">
              <span className="text-xs font-medium text-primary">{progressPercentage}%</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-8 w-8 ring-2 ring-transparent transition-all hover:ring-primary/20">
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled className="opacity-50">
                  {user?.email}
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    Painel Admin
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    signOut()
                    navigate('/login')
                  }}
                >
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 animate-fade-in-up">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
