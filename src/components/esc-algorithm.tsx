import { Card, CardContent } from '@/components/ui/card'
import { ArrowDown, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ESCAlgorithm() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end print-hidden">
        <Button onClick={() => window.print()} variant="outline">
          <Printer className="mr-2 h-4 w-4" /> Imprimir Algoritmo ESC
        </Button>
      </div>
      <div className="max-w-2xl mx-auto space-y-4 text-center">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-primary mb-4">Avaliação ESC</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg shadow-sm">
                <span className="font-bold block text-lg">Comer</span>
                <span className="text-sm text-muted-foreground">
                  &ge; 10 min ou volume adequado
                </span>
              </div>
              <div className="p-4 bg-background rounded-lg shadow-sm">
                <span className="font-bold block text-lg">Dormir</span>
                <span className="text-sm text-muted-foreground">&ge; 1 hora após alimentação</span>
              </div>
              <div className="p-4 bg-background rounded-lg shadow-sm">
                <span className="font-bold block text-lg">Consolar</span>
                <span className="text-sm text-muted-foreground">&le; 10 minutos</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center">
          <ArrowDown className="text-muted-foreground" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h4 className="font-bold text-green-700">Todos "SIM"</h4>
              <p className="text-sm text-green-600 mt-2">
                Manter tratamento não farmacológico e monitorar.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <h4 className="font-bold text-orange-700">Qualquer "NÃO"</h4>
              <p className="text-sm text-orange-600 mt-2">
                Reforçar medidas não farmacológicas e reavaliar.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end pr-[25%]">
          <ArrowDown className="text-muted-foreground" />
        </div>
        <div className="flex justify-end">
          <Card className="bg-red-50 border-red-200 w-1/2">
            <CardContent className="p-4">
              <h4 className="font-bold text-red-700">NÃO persistente</h4>
              <p className="text-sm text-red-600 mt-2">
                Considerar início de opioides (Morfina ou Metadona).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
