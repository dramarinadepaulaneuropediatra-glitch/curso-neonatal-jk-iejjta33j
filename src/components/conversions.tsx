import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightRight } from 'lucide-react'

export function Conversions() {
  const formulas = [
    {
      from: 'Morfina IV (1 mg/kg/dia)',
      to: 'Metadona VO (0.1-0.2 mg/kg/dia)',
      note: 'Iniciar com 50-75% da dose calculada',
    },
    { from: 'Fentanil (1 mcg/kg/h)', to: 'Metadona (100 mcg/kg/dia)', note: '' },
    { from: 'Fentanil', to: 'Morfina', note: 'Proporção 1:10' },
    { from: 'Midazolam 100 mcg/kg', to: 'Lorazepam 10 mcg/kg', note: 'Alternativa 1' },
    { from: 'Midazolam 100 mcg/kg', to: 'Clonazepam 2-3 mcg/kg', note: 'Alternativa 2' },
    { from: 'Midazolam 100 mcg/kg', to: 'Diazepam 15-25 mcg/kg', note: 'Alternativa 3' },
  ]
  return (
    <div className="grid gap-4">
      {formulas.map((f, i) => (
        <Card key={i} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <p className="font-semibold text-destructive">{f.from}</p>
            </div>
            <ArrowRightRight className="text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-[200px]">
              <p className="font-semibold text-primary">{f.to}</p>
              {f.note && <p className="text-xs text-muted-foreground mt-1">{f.note}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
