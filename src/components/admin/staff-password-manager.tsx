import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'

type User = { id: string; name: string; email: string }

export function StaffPasswordManager() {
  const { isAdmin } = useAuth()
  const [serverId, setServerId] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAdmin) return
    pb.send('/backend/v1/admin/users', { method: 'GET' })
      .then((res) => {
        const users: User[] = res.users || []
        const serverUser = users.find((u) => u.email === 'servidor@hjk.com')
        if (serverUser) {
          setServerId(serverUser.id)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [isAdmin])

  if (!isAdmin) return null

  const handleUpdate = async () => {
    if (!serverId) {
      toast.error('Conta de servidor universal não encontrada.')
      return
    }
    if (password.length < 8) {
      toast.error('A senha deve ter no mínimo 8 caracteres.')
      return
    }

    setLoading(true)
    try {
      await pb.send(`/backend/v1/admin/users/${serverId}/password`, {
        method: 'POST',
        body: JSON.stringify({ password }),
        headers: { 'Content-Type': 'application/json' },
      })
      toast.success('Senha universal do servidor atualizada com sucesso!')
      setPassword('')
    } catch (err: any) {
      toast.error('Erro ao atualizar a senha. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Senha do Servidor</CardTitle>
        <CardDescription>Defina uma nova senha de acesso universal para a equipe.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Nova Senha Universal</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
          />
        </div>
        <Button onClick={handleUpdate} disabled={loading || !serverId} className="w-full">
          {loading ? 'Atualizando...' : 'Salvar Alteração'}
        </Button>
      </CardContent>
    </Card>
  )
}
