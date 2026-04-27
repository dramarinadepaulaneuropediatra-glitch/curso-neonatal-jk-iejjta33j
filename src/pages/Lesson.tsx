import { useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, FileText, Info } from 'lucide-react'
import { COURSE_DATA, ALL_LESSONS } from '@/data/course'
import { useCourse } from '@/context/course-context'
import { Button } from '@/components/ui/button'
import { LessonQuiz } from '@/components/lesson-quiz'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const Lesson = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { markCompleted, setLastAccessed, completedLessons } = useCourse()
  const contentRef = useRef<HTMLDivElement>(null)

  const currentIndex = useMemo(() => ALL_LESSONS.findIndex((l) => l.id === id), [id])
  const lesson = ALL_LESSONS[currentIndex]
  const prevLesson = currentIndex > 0 ? ALL_LESSONS[currentIndex - 1] : null
  const nextLesson = currentIndex < ALL_LESSONS.length - 1 ? ALL_LESSONS[currentIndex + 1] : null

  // Find module title
  const module = COURSE_DATA.find((m) => m.lessons.some((l) => l.id === id))

  useEffect(() => {
    if (id) {
      setLastAccessed(id)
      // Scroll to top when lesson changes
      window.scrollTo(0, 0)
      if (contentRef.current) contentRef.current.scrollTop = 0
    }
  }, [id, setLastAccessed])

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Aula não encontrada</h2>
        <Button onClick={() => navigate('/')}>Voltar para o Início</Button>
      </div>
    )
  }

  const isCompleted = completedLessons.includes(lesson.id)

  const handleNext = () => {
    if (lesson.type !== 'quiz') {
      markCompleted(lesson.id)
    }
    if (nextLesson) {
      navigate(`/lesson/${nextLesson.id}`)
    } else {
      navigate('/')
    }
  }

  const handlePrev = () => {
    if (prevLesson) {
      navigate(`/lesson/${prevLesson.id}`)
    }
  }

  const renderContent = () => {
    switch (lesson.type) {
      case 'text':
      case 'interactive':
        return (
          <div className="space-y-6">
            {lesson.imageUrl && (
              <div className="rounded-xl overflow-hidden mb-8 shadow-sm">
                <img
                  src={lesson.imageUrl}
                  alt={lesson.title}
                  className="w-full max-h-[400px] object-cover"
                />
              </div>
            )}
            <div className="prose prose-slate prose-lg max-w-none text-foreground/90 leading-relaxed">
              <p>{lesson.content}</p>
            </div>

            {lesson.type === 'interactive' && (
              <Alert className="mt-8 bg-accent/10 border-accent/20">
                <Info className="h-5 w-5 text-accent" />
                <AlertTitle className="text-accent font-semibold">Dica Clínica</AlertTitle>
                <AlertDescription className="text-foreground/80 mt-2">
                  Lembre-se sempre de conferir os alarmes dos monitores antes de qualquer
                  procedimento invasivo.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )
      case 'video':
        return (
          <div className="space-y-6">
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative flex items-center justify-center">
              {/* Using standard HTML5 video for demo */}
              <video
                src={lesson.videoUrl}
                controls
                className="w-full h-full object-cover"
                poster="https://img.usecurling.com/p/800/400?q=play%20video%20hospital&color=black"
              >
                Seu navegador não suporta a tag de vídeo.
              </video>
            </div>
            <div className="prose prose-slate prose-lg max-w-none">
              <p>{lesson.content}</p>
            </div>
          </div>
        )
      case 'quiz':
        return (
          <div className="max-w-3xl mx-auto py-8">
            <LessonQuiz
              questions={lesson.questions || []}
              onComplete={() => markCompleted(lesson.id)}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-full" ref={contentRef}>
      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <BookOpenIcon className="h-4 w-4" />
          <span>{module?.title}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {lesson.title}
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">{renderContent()}</div>

        {/* Resources Sidebar (Desktop) */}
        {lesson.pdfUrl && (
          <div className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24 rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Materiais de Apoio
              </h3>
              <a
                href="#"
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors border"
                onClick={(e) => {
                  e.preventDefault()
                  alert('PDF Download Mock')
                }}
              >
                <div className="bg-red-100 text-red-600 rounded p-2">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Protocolo HJK</p>
                  <p className="text-xs text-muted-foreground">PDF • 1.2 MB</p>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Dock */}
      <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 bg-background/95 backdrop-blur-sm py-4 -mx-4 px-4 md:-mx-8 md:px-8 z-10 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrev}
          disabled={!prevLesson}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Aula Anterior
        </Button>

        <Button
          size="lg"
          onClick={handleNext}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          disabled={lesson.type === 'quiz' && !isCompleted}
        >
          {nextLesson ? 'Próxima Aula' : 'Concluir Curso'}
          {nextLesson && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}

function BookOpenIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

export default Lesson
