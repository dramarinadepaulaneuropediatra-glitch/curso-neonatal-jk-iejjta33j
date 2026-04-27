import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calculator } from 'lucide-react'

export function Conversions() {
  const formulas = [
    {
      from: 'Morfina IV (1 mg/kg/dia)',
      to: 'Metadona VO (0.1–0.2 mg/kg/dia)',
      note: 'Iniciar com 50-75% da dose calculada.',
      example: 'Exemplo: Bebê de 3kg com Morfina 3mg/dia → iniciar Metadona 0.3mg a 0.6mg/dia.',
    },
    {
      from: 'Fentanil (1 mcg/kg/h)',
      to: 'Metadona (100 mcg/kg/dia)',
      note: 'Conversão direta em dose diária total.',
      example:
        'Exemplo: Bebê em 1 mcg/kg/h de Fentanil necessita de uma dose diária total de 100 mcg/kg de Metadona.',
    },
    {
      from: 'Fentanil',
      to: 'Morfina',
      note: 'Proporção 1:10',
      example: '1 mcg de Fentanil = 10 mcg de Morfina.',
    },
    {
      from: 'Midazolam (100 mcg/kg)',
      to: 'Lorazepam (10 mcg/kg)',
      note: 'Alternativa 1 para benzodiazepínicos.',
      example: '100 mcg/kg Midazolam = 10 mcg/kg Lorazepam.',
    },
    {
      from: 'Midazolam (100 mcg/kg)',
      to: 'Clonazepam (2–3 mcg/kg)',
      note: 'Alternativa 2 para benzodiazepínicos.',
      example: '100 mcg/kg Midazolam = 2–3 mcg/kg Clonazepam.',
    },
    {
      from: 'Midazolam (100 mcg/kg)',
      to: 'Diazepam (15–25 mcg/kg)',
      note: 'Alternativa 3 (pouco recomendado).',
      example: '100 mcg/kg Midazolam = 15–25 mcg/kg Diazepam.',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {formulas.map((f, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="flex items-center flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <p className="font-semibold text-destructive">{f.from}</p>
                </div>
                <ArrowRight className="text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-[200px]">
                  <p className="font-semibold text-primary">{f.to}</p>
                  {f.note && <p className="text-sm text-muted-foreground mt-1">{f.note}</p>}
                </div>
              </div>
              {f.example && (
                <div className="bg-muted/50 p-3 rounded-md flex items-start gap-2 mt-2">
                  <Calculator className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground italic">{f.example}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4 italic text-right">
        Referência Clínica: Pediatrics 2020;146(5):e2020029074 (Patrick SW, et al.)
      </p>
    </div>
  )
}
