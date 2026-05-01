import { useEffect, useState } from 'react'
import { getAllProgress } from '@/services/course_progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function AdminDashboard() {
  const [progress, setProgress] = useState<any[]>([])

  useEffect(() => {
    getAllProgress()
      .then((res) => setProgress(res))
      .catch(console.error)
  }, [])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h1 className="text-3xl font-bold">Painel do Coordenador</h1>
      <Card>
        <CardHeader>
          <CardTitle>Desempenho dos Profissionais</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome Completo</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Aulas Concluídas</TableHead>
                <TableHead>Trilha</TableHead>
                <TableHead>Tentativas</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {progress.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    {p.expand?.user_id?.name || p.expand?.user_id?.email || 'N/A'}
                  </TableCell>
                  <TableCell>{p.expand?.user_id?.email}</TableCell>
                  <TableCell>
                    {Array.isArray(p.completed_lessons) ? p.completed_lessons.length : 0}
                  </TableCell>
                  <TableCell className="capitalize">{p.quiz_type || '-'}</TableCell>
                  <TableCell>{p.quiz_attempts || 0}</TableCell>
                  <TableCell>{p.quiz_score != null ? `${p.quiz_score}%` : '-'}</TableCell>
                  <TableCell>
                    {p.passed ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Aprovado</Badge>
                    ) : p.quiz_attempts > 0 ? (
                      <Badge variant="destructive">Reprovado</Badge>
                    ) : (
                      <Badge variant="secondary">Em andamento</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {progress.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Nenhum dado encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
