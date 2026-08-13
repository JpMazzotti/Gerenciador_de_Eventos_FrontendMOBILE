import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { login as apiLogin } from '../api/auth'
import {
  lerAuth,
  lerCredenciais,
  removerAuth,
  removerCredenciais,
  salvarAuth,
  salvarCredenciais,
} from '../storage/authStorage'
import type { CredenciaisSalvas, LoginResponse } from '../types'

interface AuthContextValue {
  carregando: boolean
  token: string | null
  nome: string | null
  email: string | null
  credenciaisSalvas: CredenciaisSalvas | null
  entrar: (email: string, senha: string, gravarSenha: boolean) => Promise<void>
  sair: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<LoginResponse | null>(null)
  const [credenciaisSalvas, setCredenciaisSalvas] = useState<CredenciaisSalvas | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregar() {
      const [authSalvo, credenciais] = await Promise.all([lerAuth(), lerCredenciais()])
      setAuth(authSalvo)
      setCredenciaisSalvas(credenciais)
      setCarregando(false)
    }
    carregar()
  }, [])

  const entrar = useCallback(async (email: string, senha: string, gravarSenha: boolean) => {
    const resposta = await apiLogin({ email, senha })
    setAuth(resposta)
    await salvarAuth(resposta)

    if (gravarSenha) {
      await salvarCredenciais(email, senha)
      setCredenciaisSalvas({ email, senha })
    } else {
      await removerCredenciais()
      setCredenciaisSalvas(null)
    }
  }, [])

  const sair = useCallback(async () => {
    setAuth(null)
    await removerAuth()
  }, [])

  const value = useMemo(() => ({
    carregando,
    token: auth?.token ?? null,
    nome: auth?.nome ?? null,
    email: auth?.email ?? null,
    credenciaisSalvas,
    entrar,
    sair,
  }), [carregando, auth, credenciaisSalvas, entrar, sair])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return ctx
}
