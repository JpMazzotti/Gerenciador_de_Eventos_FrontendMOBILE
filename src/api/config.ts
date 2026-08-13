import Constants from 'expo-constants'

function obterHost(): string {
  const hostUri = Constants.expoConfig?.hostUri
  if (hostUri) {
    const host = hostUri.split(':')[0]
    return `http://${host}:8080`
  }
  return 'http://localhost:8080'
}

export const API_BASE_URL = obterHost()
