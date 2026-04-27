import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'

type Drug = 'morphine_iv' | 'fentanyl' | 'methadone_po'

const DRUG_LABELS: Record<Drug, string> = {
  morphine_iv: 'Morfina Venosa',
  fentanyl: 'Fentanil',
  methadone_po: 'Metadona Oral',
}

const POTENCIES: Record<Drug, number> = {
  fentanyl: 100, // 1 mcg of Fentanil = 100 mcg of Morfina
  morphine_iv: 1,
  methadone_po: 1, // Assumed 1:1 conversion ratio
}

export function Conversions() {
  const [source, setSource] = useState<Drug>('fentanyl')
  const [target, setTarget] = useState<Drug>('morphine_iv')
  const [doseInput, setDoseInput] = useState<string>('')

  const isInvalid = doseInput !== '' && (isNaN(Number(doseInput)) || Number(doseInput) < 0)

  const result = useMemo(() => {
    if (doseInput === '' || isInvalid) return null

    const dose = Number(doseInput)
    // Convert input to Morphine equivalent first, then to target
    const morphineEqMcg = dose * POTENCIES[source]
    const targetMcg = morphineEqMcg / POTENCIES[target]

    return targetMcg
  }, [doseInput, source, target, isInvalid])

  const formatNumber = (num: number) => Number(num.toFixed(2)).toString()
  const formatMg = (num: number) => Number((num / 1000).toFixed(4)).toString()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Conversão de Opióides</CardTitle>
          <CardDescription>Calcule dosagens equivalentes baseadas no peso.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Medicamento de origem</Label>
              <Select value={source} onValueChange={(val) => setSource(val as Drug)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a origem" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DRUG_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Medicamento de destino</Label>
              <Select value={target} onValueChange={(val) => setTarget(val as Drug)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o destino" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DRUG_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key} disabled={key === source}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Dose de entrada (mcg/Kg)</Label>
            <Input
              type="number"
              placeholder="Ex: 10"
              step="0.1"
              min="0"
              value={doseInput}
              onChange={(e) => setDoseInput(e.target.value)}
              className={isInvalid ? 'border-red-500' : ''}
            />
            {isInvalid && (
              <p className="text-sm text-red-500">
                Por favor, insira um valor numérico válido e não negativo.
              </p>
            )}
          </div>

          {result !== null && !isInvalid && (
            <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
              <h3 className="font-semibold text-lg border-b pb-2">Resultado</h3>
              <div className="bg-background p-4 rounded border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">
                  Dose equivalente de {DRUG_LABELS[target]}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {formatNumber(result)} mcg/Kg{' '}
                  <span className="text-lg text-muted-foreground">({formatMg(result)} mg/Kg)</span>
                </p>
              </div>

              {(target === 'methadone_po' || source === 'methadone_po') && (
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertDescription className="text-amber-800">
                    <strong>Atenção:</strong> A Metadona deve ser administrada{' '}
                    <strong>exclusivamente por via oral (VO)</strong>. Monitore a resposta clínica.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
