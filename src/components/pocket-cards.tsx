import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export function PocketCards() {
  const [selectedCard, setSelectedCard] = useState<any>(null)

  const cards = [
    {
      title: 'Finnegan Rápido',
      img: 'https://img.usecurling.com/p/300/400?q=clipboard&color=green',
      content: (
        <div className="space-y-4">
          <p>Tabela simplificada para avaliação rápida à beira do leito.</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Avalie sinais a cada 3-4 horas.</li>
            <li>Pontuação &gt; 8 em 3 avaliações: iniciar farmacologia.</li>
            <li>Foco em choro, tremores, sono e fezes.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'ESC Simplificado',
      img: 'https://img.usecurling.com/p/300/400?q=flowchart&color=blue',
      content: (
        <div className="space-y-4">
          <p>
            <strong>E</strong>at (Comer), <strong>S</strong>leep (Dormir), <strong>C</strong>onsole
            (Consolar)
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>O bebê consegue mamar adequadamente?</li>
            <li>Dorme por pelo menos 1 hora após mamar?</li>
            <li>Pode ser consolado em até 10 minutos de choro?</li>
          </ul>
          <p className="text-sm">
            Se a resposta for "Não" para alguma, otimizar medidas não farmacológicas ou considerar
            farmacológicas.
          </p>
        </div>
      ),
    },
    {
      title: 'Conversões Essenciais',
      img: 'https://img.usecurling.com/p/300/400?q=calculator&color=orange',
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <strong>Morfina IV para Metadona VO:</strong>
            <p>1 mg/kg/dia IV = 0.1–0.2 mg/kg/dia VO.</p>
            <p className="text-muted-foreground text-xs mt-1">
              VO Exclusivo. Calcular dose total, iniciar com 50-75% e dividir em 4x/dia (a cada 6h).
            </p>
          </div>
          <div>
            <strong>Fentanil para Metadona VO:</strong>
            <p>1.0 mcg/kg/h IV = 100 mcg/kg/dia VO.</p>
          </div>
          <div>
            <strong>Fentanil para Morfina:</strong>
            <p>1.0 mcg/kg/h Fentanil = 10.0 mcg/kg/h Morfina.</p>
          </div>
          <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">
            Ref: Pediatrics 2020;146(5):e2020029074 (Patrick SW, et al.)
          </p>
        </div>
      ),
    },
    {
      title: 'Medicações e Doses',
      img: 'https://img.usecurling.com/p/300/400?q=medicine&color=red',
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <strong>Metadona (VO Exclusivo):</strong> Inicial 0.05 a 0.1 mg/kg/dose a cada 6h
            (Dividir dose total diária em 4).
            <p className="text-destructive font-medium mt-1">Limite MÁXIMO: 0.1 mg/kg por dose.</p>
          </div>
          <div>
            <strong>Fenobarbital:</strong> Manutenção 3–5 mg/kg/dia.
          </div>
          <div>
            <strong>Clorpromazina:</strong> 0.5–1 mg/kg/dose a cada 6h.
          </div>
          <div>
            <strong>Clonidina:</strong> 4–6 mcg/kg/dose a cada 4h.
          </div>
          <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">
            Ref: Pediatrics 2020 | Cochrane Neonatal 2021 | OpenEvidence AI
          </p>
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card
            key={c.title}
            className="overflow-hidden group cursor-pointer hover:ring-2 ring-primary"
            onClick={() => setSelectedCard(c)}
          >
            <img
              src={c.img}
              alt={c.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            />
            <CardContent className="p-3 text-center font-medium text-sm">{c.title}</CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedCard} onOpenChange={(open) => !open && setSelectedCard(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedCard?.title}</DialogTitle>
            <DialogDescription className="sr-only">
              Detalhes do card de bolso sobre {selectedCard?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto p-1">{selectedCard?.content}</div>
        </DialogContent>
      </Dialog>
    </>
  )
}
