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

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await signUp(email, name)
    if (error) {
      toast.error('Erro ao registrar. O e-mail já pode estar em uso.')
    } else {
      toast.success('Cadastro realizado com sucesso!')
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
          <CardTitle className="text-2xl">Cadastro HJK</CardTitle>
          <CardDescription>Crie sua conta para acessar o curso</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome Completo</label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. João Silva"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail Institucional</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="joao@hospital.com"
              />
            </div>
            <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
              Sua senha padrão será definida como <strong>hjk@2026</strong>.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Registrar
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              Já tem conta?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Faça login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
