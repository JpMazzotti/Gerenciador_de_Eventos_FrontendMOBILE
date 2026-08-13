import type { Evento, EventoCreateRequest, EventoUpdateRequest } from '../types'
import { api } from './client'

export function listarEventos(token: string): Promise<Evento[]> {
  return api<Evento[]>('/api/eventos', {}, token)
}

export function criarEvento(token: string, dados: EventoCreateRequest): Promise<Evento> {
  return api<Evento>('/api/eventos', {
    method: 'POST',
    body: JSON.stringify(dados),
  }, token)
}

export function atualizarEvento(token: string, id: number, dados: EventoUpdateRequest): Promise<Evento> {
  return api<Evento>(`/api/eventos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  }, token)
}

export function excluirEvento(token: string, id: number): Promise<void> {
  return api<void>(`/api/eventos/${id}`, {
    method: 'DELETE',
  }, token)
}
