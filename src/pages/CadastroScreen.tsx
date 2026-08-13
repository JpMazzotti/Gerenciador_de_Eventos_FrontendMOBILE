import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { cadastrar } from '../api/auth'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { cores, espacamento, raio } from '../utils/theme'

export function CadastroScreen() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState(false)
  const [enviando, setEnviando] = useState(false)

  async function onSubmit() {
    setErro(null)

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    setEnviando(true)
    try {
      await cadastrar({ nome, email, senha })
      setSucesso(true)
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível cadastrar.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <SafeAreaView style={styles.pagina}>
      <KeyboardAvoidingView
        style={styles.pagina}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.cartao}>
            {sucesso ? (
              <>
                <Text style={styles.tituloSucesso}>Cadastro realizado!</Text>
                <Text style={styles.textoSucesso}>
                  Sua conta foi criada com sucesso. Agora é só entrar.
                </Text>
                <Button titulo="Ir para o login" onPress={() => router.replace('/')} />
              </>
            ) : (
              <>
                <Text style={styles.titulo}>Cadastrar Administrador</Text>

                <View style={styles.formulario}>
                  <Input
                    rotulo="Nome do Administrador"
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Seu nome"
                  />

                  <Input
                    rotulo="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="voce@neki.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />

                  <Input
                    rotulo="Senha"
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="Mínimo 6 caracteres"
                    secureTextEntry
                    autoComplete="new-password"
                  />

                  <Input
                    rotulo="Confirmar Senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    placeholder="Repita a senha"
                    secureTextEntry
                    autoComplete="new-password"
                  />

                  {erro && <Text style={styles.erro}>{erro}</Text>}

                  <Button
                    titulo={enviando ? 'Cadastrando...' : 'Cadastrar'}
                    onPress={onSubmit}
                    desabilitado={enviando}
                  />
                  <Button titulo="Voltar" variante="secundaria" onPress={() => router.replace('/')} />
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: espacamento.md,
  },
  cartao: {
    backgroundColor: cores.superficie,
    borderRadius: raio.lg,
    padding: espacamento.xl,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '600',
    color: cores.texto,
    textAlign: 'center',
    marginBottom: espacamento.lg,
  },
  formulario: {
    gap: espacamento.md,
  },
  erro: {
    backgroundColor: cores.perigoFundo,
    color: cores.perigo,
    padding: 10,
    borderRadius: raio.sm,
    fontSize: 13,
  },
  tituloSucesso: {
    fontSize: 24,
    fontWeight: '600',
    color: cores.sucesso,
    textAlign: 'center',
    marginBottom: espacamento.sm,
  },
  textoSucesso: {
    fontSize: 15,
    color: cores.textoClaro,
    textAlign: 'center',
    marginBottom: espacamento.lg,
  },
})
