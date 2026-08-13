import AsyncStorage from '@react-native-async-storage/async-storage'

import type { CredenciaisSalvas, LoginResponse } from '../types'

const AUTH_KEY = 'gerenciador.auth'
const CREDENCIAIS_KEY = 'gerenciador.credenciais'

export async function salvarAuth(auth: LoginResponse): Promise<void> {
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(auth))
}

export async function removerAuth(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_KEY)
}

export async function lerAuth(): Promise<LoginResponse | null> {
  const raw = await AsyncStorage.getItem(AUTH_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as LoginResponse
  } catch {
    return null
  }
}

export async function salvarCredenciais(email: string, senha: string): Promise<void> {
  await AsyncStorage.setItem(CREDENCIAIS_KEY, JSON.stringify({ email, senha }))
}

export async function removerCredenciais(): Promise<void> {
  await AsyncStorage.removeItem(CREDENCIAIS_KEY)
}

export async function lerCredenciais(): Promise<CredenciaisSalvas | null> {
  const raw = await AsyncStorage.getItem(CREDENCIAIS_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as CredenciaisSalvas
  } catch {
    return null
  }
}
