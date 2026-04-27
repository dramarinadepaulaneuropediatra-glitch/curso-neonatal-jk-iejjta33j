import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function Pharmacology() {
  const protocols = [
    {
      name: 'Metadona',
      tags: ['Opioide sintético', 'Uso Oral (VO) Exclusivo'],
      description:
        'Opioide sintético de longa ação. Uso estritamente oral (VO). Calcular a dose diária total e dividir em 4 tomadas iguais (a cada 6 horas).',
      dose: 'Inicial: 0.05 a 0.1 mg/kg/dose a cada 6 horas.',
      adjustments: [
        'Atenção: A dose máxima por horário (dose única) é de 0.1 mg/kg.',
        'Incrementos: Aumentar em 0.05 mg/kg/dose APENAS até o limite máximo de 0.1 mg/kg/dose por horário.',
        'Redução: Após controle, reduzir 10 a 20% da dose total ao dia.',
      ],
    },
    {
      name: 'Fenobarbital',
      tags: ['Adjuvante', 'Escolha Não-Narcótica'],
      description:
        'Escolha para abstinência não narcótica ou de múltiplas drogas. Na abstinência narcótica, é preferível em associação com derivados do ópio.',
      dose: 'Ataque (opcional): 10–20 mg/kg. Manutenção: 3–5 mg/kg/dia.',
      adjustments: ['Redução: Reduzir 10 a 20% ao dia após melhora clínica.'],
    },
    {
      name: 'Clorpromazina',
      tags: ['Adjuvante', 'Neuroléptico'],
      description: 'Alternativa adjuvante eficaz para sintomas do SNC e gastrointestinais.',
      dose: '0.5–1 mg/kg/dose (500–1000 mcg/kg/dose) a cada 6 horas.',
      adjustments: ['Referência: Cochrane Neonatal 2021; OpenEvidence AI'],
    },
    {
      name: 'Clonidina',
      tags: ['Adjuvante', 'Agonista Alfa-2'],
      description:
        'Usado como terapia adjuvante para reduzir a necessidade de opioides e atenuar hiperatividade autonômica.',
      dose: '4–6 mcg/kg/dose a cada 4 horas.',
      adjustments: ['Referência: Pediatrics 2020; Cochrane 2021; OpenEvidence AI'],
    },
    {
      name: 'Lorazepam',
      tags: ['Benzodiazepínico', 'Sedação'],
      description: 'Uso para sedação isolada ou com derivados do ópio.',
      dose: '0.05 a 0.1 mg/kg/dose EV.',
      adjustments: [],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {protocols.map((p) => (
          <Card key={p.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start gap-4">
                <CardTitle className="text-lg text-primary">{p.name}</CardTitle>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.tags.map((t) => (
                  <Badge
                    key={t}
                    variant={t === 'Pouco Recomendado' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{p.description}</p>
              <div className="text-sm">
                <strong>Dose:</strong> {p.dose}
              </div>
              {p.adjustments.length > 0 && (
                <div className="text-sm">
                  <strong>Manejo:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                    {p.adjustments.map((adj, i) => (
                      <li key={i}>{adj}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4 italic text-right">
        Referência Clínica: Pediatrics 2020;146(5):e2020029074 (Patrick SW, et al.) | Cochrane
        Neonatal 2021 | OpenEvidence AI
      </p>
    </div>
  )
}
