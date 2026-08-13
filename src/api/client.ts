import type { ApiErrorBody } from '../types'
import { API_BASE_URL } from './config'

export class ApiErrorResponse extends Error {
  status: number

  constructor(status: number, mensagem: string) {
    super(mensagem)
    this.name = 'ApiErrorResponse'
    this.status = status
  }
}

export async function api<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })

  if (!response.ok) {
    let mensagem = `Erro ${response.status}`
    try {
      const corpo = (await response.json()) as ApiErrorBody
      if (corpo?.mensagem) mensagem = corpo.mensagem
    } catch {
    }
    throw new ApiErrorResponse(response.status, mensagem)
  }

  const texto = await response.text()
  if (!texto) {
    return undefined as T
  }

  return JSON.parse(texto) as T
}

