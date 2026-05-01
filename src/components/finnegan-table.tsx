import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FinneganTable() {
  const [score, setScore] = useState(0)

  const rules = [
    { label: 'Choro agudo', points: 2 },
    { label: 'Choro contínuo', points: 3 },
    { label: 'Sono < 1h após dieta', points: 3 },
    { label: 'Sono < 2h após dieta', points: 2 },
    { label: 'Sono < 3h após dieta', points: 1 },
    { label: 'Moro hiperativo', points: 2 },
    { label: 'Tremores leves (mexido)', points: 1 },
    { label: 'Tremores moderados (espontâneo)', points: 2 },
    { label: 'Convulsões', points: 5 },
    { label: 'Sudorese', points: 1 },
    { label: 'Febre 37.3 - 38°C', points: 1 },
    { label: 'Febre > 38°C', points: 2 },
    { label: 'FR > 60/min', points: 1 },
    { label: 'FR com retrações', points: 2 },
  ]

  const togglePoint = (points: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setScore((s) => s + points)
    else setScore((s) => s - points)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end print-hidden">
        <Button onClick={() => window.print()} variant="outline">
          <Printer className="mr-2 h-4 w-4" /> Imprimir Tabelas de Finnegan
        </Button>
      </div>
      <div className="sticky top-20 z-10 bg-background/95 backdrop-blur border-b pb-4 pt-2 print:static print:bg-transparent">
        <h3 className="text-2xl font-bold flex items-center justify-between">
          Escore Atual:{' '}
          <span
            className={
              score >= 12 ? 'text-red-500' : score >= 8 ? 'text-orange-500' : 'text-green-500'
            }
          >
            {score}
          </span>
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {score < 8 && 'Recomendação: Manter medidas não farmacológicas.'}
          {score >= 8 &&
            score < 12 &&
            'Recomendação: Reforçar medidas não farmacológicas e reavaliar frequentemente.'}
          {score >= 12 && 'Recomendação: Iniciar tratamento farmacológico (opioides).'}
        </p>
      </div>
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Interpretação do Escore</AlertTitle>
        <AlertDescription>
          <strong>&lt; 8:</strong> Manter medidas não farmacológicas.
          <br />
          <strong>8 - 11:</strong> Reforçar medidas e reavaliar frequentemente.
          <br />
          <strong>&ge; 12:</strong> Iniciar tratamento farmacológico (ou 3 notas &ge; 8
          consecutivas).
        </AlertDescription>
      </Alert>
      <div className="grid sm:grid-cols-2 gap-4">
        {rules.map((r, i) => (
          <label
            key={i}
            className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              onChange={(e) => togglePoint(r.points, e)}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <div className="flex-1 font-medium">{r.label}</div>
            <div className="text-muted-foreground font-bold">+{r.points}</div>
          </label>
        ))}
      </div>
    </div>
  )
}
