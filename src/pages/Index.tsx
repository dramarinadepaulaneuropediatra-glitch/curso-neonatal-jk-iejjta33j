import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Clock, PlayCircle, Award } from 'lucide-react'
import { COURSE_DATA } from '@/data/course'
import { useCourse } from '@/context/course-context'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Index = () => {
  const { lastAccessedLesson, completedLessons } = useCourse()
  const navigate = useNavigate()

  const totalLessons = COURSE_DATA.reduce((acc, m) => acc + m.lessons.length, 0)
  const isCourseCompleted = completedLessons.length === totalLessons && totalLessons > 0

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-lg">
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.usecurling.com/p/1200/600?q=hospital%20neonatal%20nursery&color=blue"
            alt="Neonatal Unit"
            className="h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex flex-col items-start gap-4">
          <Badge
            variant="secondary"
            className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border-none"
          >
            Capacitação Contínua
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold max-w-2xl leading-tight">
            Bem-vindo ao Curso da Unidade Neonatal - HJK
          </h1>
          <p className="text-primary-foreground/80 max-w-xl text-lg mt-2">
            Domine os protocolos essenciais, procedimentos e melhores práticas para o cuidado de
            recém-nascidos de alto risco.
          </p>

          <div className="mt-6">
            {isCourseCompleted ? (
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => navigate('/lesson/' + COURSE_DATA[0].lessons[0].id)}
              >
                <Award className="mr-2 h-5 w-5" />
                Revisar Curso
              </Button>
            ) : lastAccessedLesson ? (
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => navigate(`/lesson/${lastAccessedLesson}`)}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Continue de onde parou
              </Button>
            ) : (
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => navigate(`/lesson/${COURSE_DATA[0].lessons[0].id}`)}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Iniciar Curso
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Course Summary */}
      <section className="grid sm:grid-cols-3 gap-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Módulos</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{COURSE_DATA.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aulas</CardTitle>
            <PlayCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLessons}</div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tempo Estimado
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h 00m</div>
          </CardContent>
        </Card>
      </section>

      {/* Modules Map */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Módulos Disponíveis</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {COURSE_DATA.map((module, index) => {
            const isCompleted = module.lessons.every((l) => completedLessons.includes(l.id))
            const completedCount = module.lessons.filter((l) =>
              completedLessons.includes(l.id),
            ).length

            let isLocked = false
            if (index > 0) {
              const prevModuleLessons = COURSE_DATA[index - 1].lessons.map((l) => l.id)
              isLocked = !prevModuleLessons.every((id) => completedLessons.includes(id))
            }

            return (
              <Card
                key={module.id}
                className={cn(
                  'overflow-hidden flex flex-col transition-all hover:shadow-md',
                  isLocked && 'opacity-75 grayscale-[0.5]',
                )}
              >
                <div className="h-40 w-full relative">
                  <img
                    src={module.thumbnail}
                    alt={module.title}
                    className="w-full h-full object-cover"
                  />
                  {isCompleted && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white p-1 rounded-full shadow-lg">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl leading-tight">{module.title}</CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="mr-1 h-4 w-4" /> {module.duration} • {module.lessons.length}{' '}
                    aulas
                  </div>
                  <div className="w-full bg-secondary/30 h-1.5 rounded-full overflow-hidden mt-4">
                    <div
                      className="bg-primary h-full transition-all"
                      style={{ width: `${(completedCount / module.lessons.length) * 100}%` }}
                    />
                  </div>
                </CardContent>
                <CardFooter className="pt-0 border-t bg-muted/20 p-4 mt-auto">
                  <Button
                    className="w-full"
                    variant={isCompleted ? 'outline' : 'default'}
                    disabled={isLocked}
                    asChild
                  >
                    {isLocked ? (
                      <span>Bloqueado</span>
                    ) : (
                      <Link to={`/lesson/${module.lessons[0].id}`}>
                        {isCompleted
                          ? 'Revisar Módulo'
                          : completedCount > 0
                            ? 'Continuar'
                            : 'Iniciar Módulo'}
                      </Link>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Index
