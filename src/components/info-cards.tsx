import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function InfoCards({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item, i) => (
        <Card key={i} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{item.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
