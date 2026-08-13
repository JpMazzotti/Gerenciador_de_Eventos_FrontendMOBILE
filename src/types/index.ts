export interface LoginRequest {
  email: string
  senha: string
}

export interface LoginResponse {
  token: string
  email: string
  nome: string
}

export interface CadastroRequest {
  nome: string
  email: string
  senha: string
}

export interface Evento {
  id: number
  nome: string
  data: string
  localizacao: string
  imagem: string
}

export interface EventoCreateRequest {
  nome: string
  data: string
  localizacao: string
  imagem: string
}

export interface EventoUpdateRequest {
  data: string
  localizacao: string
}

export interface ApiErrorBody {
  status: number
  erro: string
  mensagem: string
}

export interface CredenciaisSalvas {
  email: string
  senha: string
}
