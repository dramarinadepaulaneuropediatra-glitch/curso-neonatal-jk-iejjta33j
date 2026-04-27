import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calculator } from 'lucide-react'

export function Conversions() {
  const formulas = [
    {
      from: 'Morfina IV 41.6 mcg/kg/h (1 mg/kg/dia)',
      to: 'Metadona VO 0.1 a 0.2 mg/kg/dia',
      note: 'Uso Oral (VO) Exclusivo. Algoritmo seguro: Calcular dose diária total, iniciar com 50-75% da dose calculada e dividir em 4 tomadas iguais (a cada 6 horas).',
      example:
        'Exemplo: Bebê de 3kg (dose total 0.6 mg/dia) → 0.15 mg/dose a cada 6h. Limite: 0.1 mg/kg/dose.',
    },
    {
      from: 'Fentanil 1.0 mcg/kg/h',
      to: 'Metadona VO 100 mcg/kg/dia (0.1 mg/kg/dia)',
      note: 'Conversão direta em dose diária total VO. Dividir a dose total em 4 tomadas iguais (a cada 6 horas).',
      example: 'Exemplo: Bebê de 3kg necessita de 300 mcg/dia → 75 mcg/dose a cada 6h.',
    },
    {
      from: 'Fentanil 1.0 mcg/kg/h',
      to: 'Morfina 10.0 mcg/kg/h',
      note: 'Proporção 1:10. Desmame de 10 a 20% ao dia.',
      example: '1.0 mcg/kg/h de Fentanil = 10.0 mcg/kg/h de Morfina.',
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
        Referência Clínica: Pediatrics 2020;146(5):e2020029074 (Patrick SW, et al.) | OpenEvidence
        AI
      </p>
    </div>
  )
}
