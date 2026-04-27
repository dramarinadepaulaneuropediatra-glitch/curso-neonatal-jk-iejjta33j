import { ChangePasswordForm } from '@/components/admin/change-password-form'
import { StaffPasswordManager } from '@/components/admin/staff-password-manager'

export default function AdminSettings() {
  return (
    <div className="container max-w-2xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações da Conta</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie a segurança da sua conta de administrador.
        </p>
      </div>
      <ChangePasswordForm />

      <div className="pt-8 border-t">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Gestão de Acesso dos Servidores</h2>
        <StaffPasswordManager />
      </div>
    </div>
  )
}
