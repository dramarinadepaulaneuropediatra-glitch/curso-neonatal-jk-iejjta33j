import { useEffect, useState } from 'react'
import { useCourse } from '@/context/course-context'
import { useAuth } from '@/hooks/use-auth'
import { getMyProgress } from '@/services/course_progress'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Certificate() {
  const { passed } = useCourse()
  const { user } = useAuth()
  const [completionDate, setCompletionDate] = useState<string>(
    new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
  )

  useEffect(() => {
    if (user?.id && passed) {
      getMyProgress(user.id).then((res) => {
        if (res && res.updated) {
          setCompletionDate(
            new Date(res.updated).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }),
          )
        }
      })
    }
  }, [user?.id, passed])

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
      <div className="flex justify-end print-hidden">
        <Button onClick={() => window.print()} variant="outline">
          <Printer className="mr-2 h-4 w-4" /> Imprimir Certificado de Conclusão
        </Button>
      </div>
      <Card
        className="border-[8px] border-double border-primary/20 bg-card p-8 md:p-12 text-center relative overflow-hidden print:border-gray-300 print:shadow-none"
        id="certificate-print"
      >
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/800/600?q=watermark&color=gray')] opacity-5 pointer-events-none print:opacity-10" />
        <CardContent className="space-y-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif text-primary font-bold uppercase tracking-widest print:text-black">
            CERTIFICADO
          </h1>
          <p className="text-lg text-muted-foreground print:text-gray-600">Certificamos que</p>
          <h2 className="text-3xl font-bold border-b pb-2 inline-block min-w-[300px] print:border-gray-400">
            {user?.name || user?.email}
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground print:text-gray-600">
            concluiu com êxito o curso de capacitação em{' '}
            <strong className="text-foreground print:text-black">
              Síndrome de Abstinência Neonatal (SAN)
            </strong>
            , com carga horária total de <strong>2 horas</strong>.
          </p>
          <p className="text-md font-medium mt-4 print:text-black">
            Data de Conclusão: {completionDate}
          </p>
          <div className="grid grid-cols-3 gap-4 pt-12 text-xs md:text-sm font-medium border-t mt-12 text-muted-foreground print:border-gray-300 print:text-gray-600">
            <div>
              <p className="border-t border-muted-foreground/30 pt-2 px-2">
                <span className="font-bold text-foreground print:text-black">
                  Nilma Matoso Nicácio
                </span>
                <br />
                <span className="text-[11px] md:text-xs">
                  Gerente da Unidade Neonatal do Hospital Júlia Kubitschek
                </span>
              </p>
            </div>
            <div>
              <p className="border-t border-muted-foreground/30 pt-2 px-2">
                <span className="font-bold text-foreground print:text-black">Letícia Coelho</span>
                <br />
                <span className="text-[11px] md:text-xs">
                  Coordenadora médica do Hospital Júlia Kubitschek
                </span>
              </p>
            </div>
            <div>
              <p className="border-t border-muted-foreground/30 pt-2 px-2">
                <span className="font-bold text-foreground print:text-black">
                  Marina de Paula Lima Oliveira
                </span>
                <br />
                <span className="text-[11px] md:text-xs">
                  neuropediatra da Unidade Neonatal do Hospital Júlia Kubitischek
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
