import { ChangePasswordForm } from '@/components/admin/change-password-form'

export default function AdminSettings() {
  return (
    <div className="container max-w-2xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Configurações da Conta</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie a segurança da sua conta de administrador.
        </p>
      </div>
      <ChangePasswordForm />
    </div>
  )
}
