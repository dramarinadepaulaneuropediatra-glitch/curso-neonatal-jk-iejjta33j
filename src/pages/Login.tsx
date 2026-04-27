import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { Stethoscope } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const passToUse =
      email === 'dramarinadepaulaneuropediatra@gmail.com' ? password : password || 'hjk@2026'
    const { error } = await signIn(email, passToUse)
    if (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.')
    } else {
      toast.success('Login realizado com sucesso!')
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Stethoscope className="text-primary h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Curso Neonatal HJK</CardTitle>
          <CardDescription>Acesse o portal de capacitação em SAN</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            {email === 'dramarinadepaulaneuropediatra@gmail.com' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Senha</label>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            {email !== 'dramarinadepaulaneuropediatra@gmail.com' && email.length > 0 && (
              <p className="text-xs text-muted-foreground">
                A senha padrão "hjk@2026" será utilizada automaticamente.
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              Não tem conta?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Registre-se
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
