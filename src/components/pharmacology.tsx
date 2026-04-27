import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function Pharmacology() {
  const protocols = [
    {
      name: 'Metadona',
      tags: ['Opioide sintético', 'Recomendado pelo FDA'],
      description:
        'Opioide sintético aprovado pelo FDA para abstinência de narcóticos maternos (incluindo heroína). Apresenta boa eficácia oral e meia-vida longa.',
      dose: 'Inicial de 0.05 a 0.1 mg/kg a cada 6 horas.',
      adjustments: [
        'Incrementos: Aumentar em 0.05 mg/kg até 0.5–1.0 mg/kg até o controle dos sintomas.',
        'Redução: Após controle, reduzir 10% ao dia e espaçar intervalos para 12 ou 24 horas.',
        'Descontinuação: Pode ser tentada quando a dose atingir 0.05 mg/kg/dia.',
      ],
    },
    {
      name: 'Fenobarbital',
      tags: ['Adjuvante', 'Escolha Não-Narcótica'],
      description:
        'Escolha para abstinência não narcótica ou de múltiplas drogas. Na abstinência narcótica, é preferível em associação com derivados do ópio. Causa sedação, sucção fraca e é ineficaz para sintomas gastrointestinais.',
      dose: 'Ataque (opcional): 10–20 mg/kg. Manutenção: 3–5 mg/kg/dia.',
      adjustments: [
        'Ajustes: A manutenção pode ser ajustada pelos escores de abstinência ou aumentada em 2 mg/kg/dia.',
        'Redução: Reduzir 10% ao dia após melhora clínica.',
      ],
    },
    {
      name: 'Lorazepam',
      tags: ['Benzodiazepínico', 'Sedação'],
      description:
        'Uso para sedação isolada ou com derivados do ópio para permitir doses menores. Estudos em recém-nascidos são escassos.',
      dose: '0.05 a 0.1 mg/kg/dose EV.',
      adjustments: [],
    },
    {
      name: 'Diazepam',
      tags: ['Benzodiazepínico', 'Pouco Recomendado'],
      description: 'Pouco recomendado devido a problemas em recém-nascidos.',
      dose: '0.1 a 0.3 mg/kg IM a cada 8 horas até controle.',
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
        Referência Clínica: Pediatrics 2020;146(5):e2020029074 (Patrick SW, et al.)
      </p>
    </div>
  )
}
