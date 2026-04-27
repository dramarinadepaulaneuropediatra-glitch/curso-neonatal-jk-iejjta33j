import { useCourse } from '@/context/course-context'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Certificate() {
  const { passed } = useCourse()
  const { user } = useAuth()

  if (!passed) {
    return (
      <Card className="bg-muted/50 border-dashed text-center py-12">
        <CardContent>
          <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-muted-foreground">Certificado Bloqueado</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Conclua o Quiz de Certificação com nota &ge; 70% para desbloquear.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => window.print()}>
          <Download className="mr-2 h-4 w-4" /> Imprimir / PDF
        </Button>
      </div>
      <Card
        className="border-[8px] border-double border-primary/20 bg-card p-8 md:p-12 text-center relative overflow-hidden"
        id="certificate-print"
      >
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/800/600?q=watermark&color=gray')] opacity-5 pointer-events-none" />
        <CardContent className="space-y-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif text-primary font-bold uppercase tracking-widest">
            CERTIFICADO
          </h1>
          <p className="text-lg text-muted-foreground">Certificamos que</p>
          <h2 className="text-3xl font-bold border-b pb-2 inline-block min-w-[300px]">
            {user?.name || user?.email}
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground">
            concluiu com êxito o curso de capacitação em{' '}
            <strong className="text-foreground">Síndrome de Abstinência Neonatal (SAN)</strong>, com
            carga horária total de <strong>2 horas</strong>.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-12 text-sm font-medium border-t mt-12 text-muted-foreground">
            <div>
              <p className="border-t border-muted-foreground/30 pt-2 px-2">
                Dra. Marina de Paula
                <br />
                Coordenação Médica
              </p>
            </div>
            <div>
              <p className="border-t border-muted-foreground/30 pt-2 px-2">
                Letícia Coelho
                <br />
                Coordenação de Enfermagem
              </p>
            </div>
            <div>
              <p className="border-t border-muted-foreground/30 pt-2 px-2">
                Nilma Matozinhos
                <br />
                Diretoria HJK
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
