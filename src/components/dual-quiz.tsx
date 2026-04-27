import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, Stethoscope, Users } from 'lucide-react'
import { useCourse } from '@/context/course-context'
import { cn } from '@/lib/utils'

const MED_QUESTIONS = [
  {
    q: 'Qual a dose de ataque do Fenobarbital?',
    opts: ['3-5 mg/kg', '10-20 mg/kg', '20-30 mg/kg'],
    ans: 1,
  },
  {
    q: 'Na conversão Fentanil para Morfina, qual a proporção?',
    opts: ['1:1', '1:5', '1:10 (ex: 1 mcg/kg/h = 10 mcg/kg/h)'],
    ans: 2,
  },
  {
    q: 'Qual a taxa recomendada para desmame (redução) de opioides e adjuvantes após estabilização?',
    opts: ['Apenas 10% ao dia', '10 a 20% ao dia', '20 a 30% ao dia'],
    ans: 1,
  },
]

const MULTI_QUESTIONS = [
  {
    q: 'Qual o limite de ruído ideal no ambiente?',
    opts: ['< 30 dB', '< 50 dB', '< 70 dB'],
    ans: 1,
  },
  { q: 'O que avalia o C do ESC?', opts: ['Chorar', 'Consolar (<= 10 min)', 'Cuidado'], ans: 1 },
  {
    q: 'O contato pele a pele promove:',
    opts: ['Apenas vínculo', 'Aumento do choro', 'Estabilidade térmica e cardiorrespiratória'],
    ans: 2,
  },
]

export function DualQuiz() {
  const { submitQuiz, passed, quizScore } = useCourse()
  const [track, setTrack] = useState<'med' | 'multi' | null>(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const questions = track === 'med' ? MED_QUESTIONS : MULTI_QUESTIONS

  const handleNext = () => {
    let newScore = score
    if (selected === questions[current].ans) newScore += 1

    if (current < questions.length - 1) {
      setScore(newScore)
      setCurrent(current + 1)
      setSelected(null)
    } else {
      const finalScore = Math.round((newScore / questions.length) * 100)
      setFinished(true)
      submitQuiz(finalScore, track || '')
    }
  }

  if (passed) {
    return (
      <Card className="bg-green-50 border-green-200 text-center py-8">
        <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <CardTitle className="text-green-800">Aprovado!</CardTitle>
        <p className="text-green-700 mt-2">Sua nota: {quizScore}%</p>
      </Card>
    )
  }

  if (!track) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card
          className="cursor-pointer hover:border-primary transition-all hover:shadow-md"
          onClick={() => setTrack('med')}
        >
          <CardContent className="p-6 text-center space-y-4">
            <Stethoscope className="h-12 w-12 text-primary mx-auto" />
            <CardTitle>Quiz Médico</CardTitle>
            <p className="text-sm text-muted-foreground">
              Foco em doses e conversões farmacológicas.
            </p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:border-primary transition-all hover:shadow-md"
          onClick={() => setTrack('multi')}
        >
          <CardContent className="p-6 text-center space-y-4">
            <Users className="h-12 w-12 text-primary mx-auto" />
            <CardTitle>Quiz Multiprofissional</CardTitle>
            <p className="text-sm text-muted-foreground">
              Foco em avaliação (ESC) e medidas ambientais.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (finished) {
    return (
      <Card className="text-center py-8">
        {quizScore >= 70 ? (
          <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
        ) : (
          <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
        )}
        <CardTitle>{quizScore >= 70 ? 'Aprovado!' : 'Tente Novamente'}</CardTitle>
        <p className="mt-2 text-muted-foreground">Sua nota: {quizScore}% (Mínimo: 70%)</p>
        {!passed && (
          <Button
            className="mt-4"
            onClick={() => {
              setTrack(null)
              setCurrent(0)
              setScore(0)
              setFinished(false)
            }}
          >
            Refazer Quiz
          </Button>
        )}
      </Card>
    )
  }

  const q = questions[current]

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Questão {current + 1} de {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{q.q}</p>
        <div className="space-y-2">
          {q.opts.map((opt, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                'p-4 rounded-lg border cursor-pointer transition-colors',
                selected === i ? 'border-primary bg-primary/10 text-primary' : 'hover:bg-muted',
              )}
            >
              {opt}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button disabled={selected === null} onClick={handleNext}>
          Responder
        </Button>
      </CardFooter>
    </Card>
  )
}
