import type { CadastroRequest, LoginRequest, LoginResponse } from '../types'
import { api } from './client'

export function login(dados: LoginRequest): Promise<LoginResponse> {
  return api<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(dados),
  })
}

export function cadastrar(dados: CadastroRequest): Promise<void> {
  return api<void>('/api/auth/cadastro', {
    method: 'POST',
    body: JSON.stringify(dados),
  })
}
