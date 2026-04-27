import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { ReactNode } from 'react'

export function ProtectedRoute({
  children,
  adminOnly = false,
}: {
  children: ReactNode
  adminOnly?: boolean
}) {
  const { user, isAdmin, loading } = useAuth()

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />

  return <>{children}</>
}
