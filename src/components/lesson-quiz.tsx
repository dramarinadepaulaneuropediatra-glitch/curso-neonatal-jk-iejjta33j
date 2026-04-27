import { useState } from 'react'
import { Question } from '@/data/course'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LessonQuizProps {
  questions: Question[]
  onComplete: () => void
}

export function LessonQuiz({ questions, onComplete }: LessonQuizProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isPassed, setIsPassed] = useState(false)

  const question = questions[currentQuestionIdx]

  const handleSelect = (index: number) => {
    if (isAnswered) return
    setSelectedOption(index)
  }

  const handleCheck = () => {
    setIsAnswered(true)
  }

  const handleNext = () => {
    if (selectedOption === question.correctIndex) {
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx((prev) => prev + 1)
        setSelectedOption(null)
        setIsAnswered(false)
      } else {
        setIsPassed(true)
        onComplete()
      }
    } else {
      // Retry logic
      setSelectedOption(null)
      setIsAnswered(false)
    }
  }

  if (isPassed) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-green-800">Parabéns!</h3>
          <p className="text-green-700">Você compreendeu os conceitos chave desta lição.</p>
        </CardContent>
      </Card>
    )
  }

  const isCorrect = selectedOption === question.correctIndex

  return (
    <Card className="shadow-md border-border/60">
      <CardHeader>
        <CardTitle className="text-xl">Verificação de Aprendizado</CardTitle>
        <CardDescription>
          Questão {currentQuestionIdx + 1} de {questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-medium">{question.text}</p>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index
            let itemClass = 'border-border hover:bg-accent/10 hover:border-accent/50 cursor-pointer'

            if (isAnswered) {
              if (index === question.correctIndex) {
                itemClass = 'border-green-500 bg-green-50 text-green-900 cursor-default'
              } else if (isSelected) {
                itemClass = 'border-red-500 bg-red-50 text-red-900 cursor-default'
              } else {
                itemClass = 'opacity-50 cursor-default'
              }
            } else if (isSelected) {
              itemClass = 'border-primary bg-primary/5 ring-1 ring-primary cursor-pointer'
            }

            return (
              <div
                key={index}
                onClick={() => handleSelect(index)}
                className={cn(
                  'p-4 rounded-xl border transition-all duration-200 flex items-center justify-between',
                  itemClass,
                )}
              >
                <span>{option}</span>
                {isAnswered && index === question.correctIndex && (
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                )}
                {isAnswered && isSelected && index !== question.correctIndex && (
                  <XCircle className="h-5 w-5 text-red-600 shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 pt-4 flex justify-end">
        {!isAnswered ? (
          <Button
            onClick={handleCheck}
            disabled={selectedOption === null}
            className="min-w-[120px]"
          >
            Verificar
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            variant={isCorrect ? 'default' : 'destructive'}
            className="min-w-[120px]"
          >
            {isCorrect ? 'Continuar' : 'Tentar Novamente'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
