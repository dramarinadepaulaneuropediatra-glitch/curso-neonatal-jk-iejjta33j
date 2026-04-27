import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Pharmacology() {
  const meds = [
    { name: 'Morfina', dose: '300–1000 mcg/kg/dia (0.3–1 mg/kg/dia)', freq: 'q3–4h' },
    { name: 'Metadona', dose: '0.05–0.1 mg/kg/dose (50–100 mcg/kg/dose)', freq: 'q6h' },
    { name: 'Buprenorfina', dose: '13–40 mcg/kg/dia', freq: 'Dividido' },
    { name: 'Clonidina', dose: '4–6 mcg/kg/dose', freq: 'q4h' },
    { name: 'Fenobarbital', dose: 'Ataque: 10–15 mg/kg | Manut: 3–5 mg/kg/dia', freq: 'q12-24h' },
    { name: 'Clorpromazina', dose: '0.5–1 mg/kg/dose', freq: 'q6h' },
  ]
  const benzos = [
    { name: 'Lorazepam', dose: '35-50 mcg/kg' },
    { name: 'Clonazepam', dose: '2-3 mcg/kg' },
    { name: 'Diazepam', dose: '15-25 mcg/kg' },
  ]
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {meds.map((m) => (
          <Card key={m.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-primary">{m.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                <strong>Dose:</strong> {m.dose}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Frequência:</strong> {m.freq}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">Benzodiazepínicos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {benzos.map((b) => (
              <li key={b.name}>
                <strong>{b.name}:</strong> {b.dose}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
