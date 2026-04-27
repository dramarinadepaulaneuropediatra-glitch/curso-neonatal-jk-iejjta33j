import { Card, CardContent } from '@/components/ui/card'

export function PocketCards() {
  const cards = [
    {
      title: 'Finnegan Rápido',
      img: 'https://img.usecurling.com/p/300/400?q=clipboard&color=green',
    },
    {
      title: 'ESC Simplificado',
      img: 'https://img.usecurling.com/p/300/400?q=flowchart&color=blue',
    },
    {
      title: 'Conversões Essenciais',
      img: 'https://img.usecurling.com/p/300/400?q=calculator&color=orange',
    },
    { title: 'Guia para Pais', img: 'https://img.usecurling.com/p/300/400?q=family&color=pink' },
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c) => (
        <Card
          key={c.title}
          className="overflow-hidden group cursor-pointer hover:ring-2 ring-primary"
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
  )
}
