import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export function Conversions() {
  const [totalDaily, setTotalDaily] = useState<string>('')

  const calculate = () => {
    const t = parseFloat(totalDaily)
    if (isNaN(t) || t <= 0) return null

    // Convert to mcg/day
    const totalMcg = Math.round(t * 1000)
    // Needs to be divided exactly into 4 oral doses
    const perDoseMcg = Math.round(totalMcg / 4)

    return { totalMcg, perDoseMcg }
  }

  const result = calculate()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Dose - Metadona Oral (VO)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Dose Diária Total Prescrita (em mg)</Label>
            <Input
              type="number"
              placeholder="Ex: 0.8"
              step="0.1"
              value={totalDaily}
              onChange={(e) => setTotalDaily(e.target.value)}
            />
          </div>

          {result && (
            <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
              <h3 className="font-semibold text-lg border-b pb-2">Esquema de Administração (VO)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm text-muted-foreground">Dose Diária Total</p>
                  <p className="text-2xl font-bold text-primary">{result.totalMcg} mcg</p>
                  <p className="text-xs text-muted-foreground">
                    ({(result.totalMcg / 1000).toFixed(2)} mg)
                  </p>
                </div>
                <div className="bg-background p-3 rounded border border-primary/50">
                  <p className="text-sm text-muted-foreground">Dose por Horário (a cada 6h)</p>
                  <p className="text-2xl font-bold text-primary">{result.perDoseMcg} mcg</p>
                  <p className="text-xs font-medium text-primary">Dividido em 4 tomadas orais</p>
                </div>
              </div>
              <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                <strong>Diretriz:</strong> A dose total deve ser{' '}
                <strong>obrigatoriamente dividida em 4 doses orais</strong>. Os valores calculados
                foram arredondados para o número inteiro mais próximo (em mcg) para facilitar a
                compreensão clínica. O uso intravenoso (IV) está contraindicado.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
