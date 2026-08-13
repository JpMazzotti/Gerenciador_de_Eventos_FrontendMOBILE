import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'

import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useAuth } from '../context/AuthContext'
import { cores, espacamento } from '../utils/theme'

export function LoginScreen() {
  const { entrar, credenciaisSalvas } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [gravarSenha, setGravarSenha] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (credenciaisSalvas) {
      setEmail(credenciaisSalvas.email)
      setSenha(credenciaisSalvas.senha)
    }
  }, [credenciaisSalvas])

  async function aoEntrar() {
    if (!email.trim() || !senha.trim()) {
      setErro('Informe e-mail e senha.')
      return
    }
    setCarregando(true)
    setErro(null)
    try {
      await entrar(email.trim(), senha, gravarSenha)
      router.replace('/home')
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao entrar.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>Gerenciador de Eventos</Text>
          <Text style={styles.subtitulo}>Entre com sua conta para continuar</Text>
        </View>

        <View style={styles.formulario}>
          <Input
            rotulo="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />
          <Input
            rotulo="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder="Sua senha"
            secureTextEntry
          />

          <PressableCheckbox
            marcado={gravarSenha}
            aoAlternar={() => setGravarSenha((v) => !v)}
          />

          {erro && <Text style={styles.erro}>{erro}</Text>}

          <Button
            titulo={carregando ? 'Entrando...' : 'Entrar'}
            onPress={aoEntrar}
            desabilitado={carregando}
          />
        </View>

        <View style={styles.rodape}>
          <Text style={styles.textoRodape}>Não tem conta?</Text>
          <Button
            titulo="Criar conta"
            variante="secundaria"
            onPress={() => router.push('/cadastro')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

function PressableCheckbox({
  marcado,
  aoAlternar,
}: {
  marcado: boolean
  aoAlternar: () => void
}) {
  return (
    <PressableCheckboxView marcado={marcado} aoAlternar={aoAlternar} />
  )
}

function PressableCheckboxView({
  marcado,
  aoAlternar,
}: {
  marcado: boolean
  aoAlternar: () => void
}) {
  const { Pressable } = require('react-native') as typeof import('react-native')
  return (
    <Pressable style={styles.checkboxLinha} onPress={aoAlternar}>
      <View style={[styles.checkbox, marcado && styles.checkboxMarcado]}>
        {marcado && <Text style={styles.checkboxCheck}>✓</Text>}
      </View>
      <Text style={styles.checkboxTexto}>Lembrar minha senha</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: espacamento.lg,
    gap: espacamento.xl,
  },
  cabecalho: {
    alignItems: 'center',
    gap: espacamento.xs,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: cores.texto,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 15,
    color: cores.textoClaro,
    textAlign: 'center',
  },
  formulario: {
    gap: espacamento.md,
  },
  erro: {
    backgroundColor: cores.perigoFundo,
    color: cores.perigo,
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
  },
  checkboxLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamento.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: cores.borda,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxMarcado: {
    backgroundColor: cores.primaria,
    borderColor: cores.primaria,
  },
  checkboxCheck: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  checkboxTexto: {
    fontSize: 14,
    color: cores.textoClaro,
  },
  rodape: {
    gap: espacamento.sm,
  },
  textoRodape: {
    textAlign: 'center',
    color: cores.textoClaro,
    fontSize: 14,
  },
})
