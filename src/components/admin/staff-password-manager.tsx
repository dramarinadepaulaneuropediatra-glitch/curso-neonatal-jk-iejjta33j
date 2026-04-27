import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import pb from '@/lib/pocketbase/client'

type User = { id: string; name: string; email: string }

export function StaffPasswordManager() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    pb.send('/backend/v1/admin/users', { method: 'GET' })
      .then((res) => setUsers(res.users || []))
      .catch((err) => {
        console.error(err)
        toast.error('Erro ao carregar servidores.')
      })
  }, [])

  const handleUpdate = async () => {
    if (!selectedUser) {
      toast.error('Selecione um servidor.')
      return
    }
    if (password.length < 8) {
      toast.error('A senha deve ter no mínimo 8 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.')
      return
    }

    setLoading(true)
    try {
      await pb.send(`/backend/v1/admin/users/${selectedUser}/password`, {
        method: 'POST',
        body: JSON.stringify({ password }),
        headers: { 'Content-Type': 'application/json' },
      })
      toast.success('Senha do servidor atualizada com sucesso')
      setPassword('')
      setConfirmPassword('')
      setSelectedUser('')
    } catch (err: any) {
      toast.error(err.message || 'Erro ao atualizar senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atualizar Senha de Servidor</CardTitle>
        <CardDescription>
          Selecione um servidor e defina uma nova senha de acesso ao portal.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Servidor</Label>
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um servidor..." />
            </SelectTrigger>
            <SelectContent>
              {users.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.name || u.email} ({u.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Nova Senha</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
          />
        </div>
        <div className="space-y-2">
          <Label>Confirmar Nova Senha</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a senha"
          />
        </div>
        <Button onClick={handleUpdate} disabled={loading} className="w-full">
          {loading ? 'Atualizando...' : 'Atualizar Senha'}
        </Button>
      </CardContent>
    </Card>
  )
}
