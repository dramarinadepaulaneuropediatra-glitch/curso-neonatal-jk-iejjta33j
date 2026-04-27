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
import { AlertCircle } from 'lucide-react'

type Drug = 'morphine_iv' | 'fentanyl' | 'methadone_po'

const DRUG_LABELS: Record<Drug, string> = {
  morphine_iv: 'Morfina Venosa',
  fentanyl: 'Fentanil',
  methadone_po: 'Metadona Oral',
}

const DRUG_UNITS: Record<Drug, string> = {
  morphine_iv: 'mcg/kg/h',
  fentanyl: 'mcg/kg/h',
  methadone_po: 'mcg/kg/dose',
}

const POTENCIES: Record<Drug, number> = {
  fentanyl: 100, // 1 mcg of Fentanil = 100 mcg of Morfina
  morphine_iv: 1,
  methadone_po: 1, // Assumed 1:1 conversion ratio
}

export function Conversions() {
  const [source, setSource] = useState<Drug>('fentanyl')
  const [target, setTarget] = useState<Drug>('methadone_po')
  const [doseInput, setDoseInput] = useState<string>('')
  const [weightInput, setWeightInput] = useState<string>('')

  const doseInvalid = doseInput !== '' && (isNaN(Number(doseInput)) || Number(doseInput) <= 0)
  const weightInvalid =
    weightInput !== '' && (isNaN(Number(weightInput)) || Number(weightInput) <= 0)
  const isMissingFields = doseInput === '' || weightInput === ''
  const hasErrors = doseInvalid || weightInvalid

  const isSourceIV = source === 'morphine_iv' || source === 'fentanyl'
  const isTargetIV = target === 'morphine_iv' || target === 'fentanyl'

  const result = useMemo(() => {
    if (isMissingFields || hasErrors) return null

    const dose = Number(doseInput)
    const weight = Number(weightInput)
    const sourcePotency = POTENCIES[source]
    const targetPotency = POTENCIES[target]

    // 1. Calculate Daily Morphine Equivalent (mcg/kg/day)
    // Continuous IV is per hour (* 24), Methadone PO is Q6H (* 4 doses)
    const dailyMorphineEq = isSourceIV ? dose * 24 * sourcePotency : dose * 4 * sourcePotency

    // 2. Calculate Target Daily Dose (mcg/kg/day)
    const targetDailyDose = dailyMorphineEq / targetPotency

    // 3. Calculate Target Specific Dose per administration
    const targetDose = isTargetIV ? targetDailyDose / 24 : targetDailyDose / 4

    return {
      perKgMcg: targetDose,
      perKgMg: targetDose / 1000,
      absoluteMcg: targetDose * weight,
      absoluteMg: (targetDose * weight) / 1000,
    }
  }, [doseInput, weightInput, source, target, isMissingFields, hasErrors, isSourceIV, isTargetIV])

  const formatNumber = (num: number) => Number(num.toFixed(2)).toString()
  const formatMg = (num: number) => Number(num.toFixed(4)).toString()

  const getUnit = (drug: Drug, isMg: boolean = false) => {
    if (drug === 'methadone_po') return isMg ? 'mg/kg/dose' : 'mcg/kg/dose'
    return isMg ? 'mg/kg/h' : 'mcg/kg/h'
  }

  const getAbsoluteUnit = (drug: Drug, isMg: boolean = false) => {
    if (drug === 'methadone_po') return isMg ? 'mg/dose' : 'mcg/dose'
    return isMg ? 'mg/h' : 'mcg/h'
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Conversão de Opióides</CardTitle>
          <CardDescription>
            Calcule dosagens equivalentes baseadas no peso com transição segura entre IV e VO.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Medicamento de origem</Label>
              <Select
                value={source}
                onValueChange={(val) => {
                  setSource(val as Drug)
                  if (val === target) {
                    setTarget(val === 'methadone_po' ? 'morphine_iv' : 'methadone_po')
                  }
                }}
              >
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Peso do paciente (kg) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                placeholder="Ex: 3.2"
                step="0.1"
                min="0"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className={weightInvalid ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {weightInvalid && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Insira um peso válido.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Dose inicial ({DRUG_UNITS[source]}) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                placeholder="Ex: 10"
                step="0.1"
                min="0"
                value={doseInput}
                onChange={(e) => setDoseInput(e.target.value)}
                className={doseInvalid ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {doseInvalid && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Insira uma dose válida.
                </p>
              )}
            </div>
          </div>

          {(!weightInput || !doseInput) && !hasErrors && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-800">
                Preencha o peso do paciente e a dose inicial para calcular a conversão.
              </AlertDescription>
            </Alert>
          )}

          {result !== null && (
            <div className="mt-6 p-5 bg-muted/50 rounded-xl space-y-4 border border-border/50">
              <h3 className="font-semibold text-lg border-b border-border/50 pb-2">
                Resultado da Conversão
              </h3>

              <div className="bg-background p-5 rounded-lg border border-primary/20 shadow-sm">
                <div className="flex flex-col gap-1 mb-3">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Dose equivalente de {DRUG_LABELS[target]}
                  </p>

                  {target === 'methadone_po' ? (
                    <div className="inline-flex items-center w-fit px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Frequência: 6 em 6 horas (Q6H)
                    </div>
                  ) : (
                    <div className="inline-flex items-center w-fit px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                      Infusão Contínua (IV)
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <p className="text-3xl font-bold text-primary tracking-tight">
                    {formatNumber(result.perKgMcg)}{' '}
                    <span className="text-lg font-semibold text-primary/80">{getUnit(target)}</span>
                  </p>
                  <p className="text-lg text-muted-foreground mt-1">
                    ({formatMg(result.perKgMg)} {getUnit(target, true)})
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border/50">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Dose Absoluta (para {weightInput} kg)
                  </p>
                  <p className="text-xl font-semibold text-foreground">
                    {formatNumber(result.absoluteMcg)}{' '}
                    <span className="text-sm font-medium text-muted-foreground">
                      {getAbsoluteUnit(target)}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    ({formatMg(result.absoluteMg)} {getAbsoluteUnit(target, true)})
                  </p>
                </div>
              </div>

              {(target === 'methadone_po' || source === 'methadone_po') && (
                <Alert className="bg-amber-50 border-amber-200 mt-4">
                  <AlertDescription className="text-amber-800">
                    <strong>Atenção:</strong> A Metadona deve ser administrada{' '}
                    <strong>exclusivamente por via oral (VO)</strong>. Monitore a resposta clínica e
                    realize o desmame gradativo conforme protocolo.
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
