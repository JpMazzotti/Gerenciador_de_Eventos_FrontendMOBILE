import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { atualizarEvento, criarEvento, excluirEvento, listarEventos } from '../api/eventos'
import { EventCard } from '../components/EventCard'
import { EventFormModal } from '../components/EventFormModal'
import type { EventoFormData } from '../components/EventFormModal'
import { useAuth } from '../context/AuthContext'
import type { Evento } from '../types'
import { cores, espacamento, raio } from '../utils/theme'

export function HomeScreen() {
  const { token, nome, sair } = useAuth()

  const [eventos, setEventos] = useState<Evento[]>([])
  const [carregando, setCarregando] = useState(true)
  const [modalAberto, setModalAberto] = useState(false)
  const [modo, setModo] = useState<'criar' | 'editar'>('criar')
  const [eventoEditando, setEventoEditando] = useState<Evento | null>(null)

  const carregarEventos = useCallback(async () => {
    if (!token) return
    setCarregando(true)
    try {
      setEventos(await listarEventos(token))
    } catch (err) {
      if (err instanceof Error && 'status' in err && (err as { status: number }).status === 401) {
        await sair()
        router.replace('/')
        return
      }
      Alert.alert('Erro', err instanceof Error ? err.message : 'Não foi possível carregar os eventos.')
    } finally {
      setCarregando(false)
    }
  }, [token, sair])

  useEffect(() => {
    if (!token) {
      router.replace('/')
      return
    }
    carregarEventos()
  }, [token, carregarEventos])

  async function salvar(dados: EventoFormData) {
    if (!token) return
    try {
      if (modo === 'criar') {
        await criarEvento(token, dados)
      } else if (eventoEditando) {
        await atualizarEvento(token, eventoEditando.id, {
          data: dados.data,
          localizacao: dados.localizacao,
        })
      }
      setModalAberto(false)
      await carregarEventos()
    } catch (err) {
      Alert.alert('Erro', err instanceof Error ? err.message : 'Não foi possível salvar o evento.')
    }
  }

  async function excluirEventoComErro(evento: Evento) {
    if (!token) return
    try {
      await excluirEvento(token, evento.id)
      await carregarEventos()
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Não foi possível excluir o evento.'
      if (Platform.OS === 'web') {
        window.alert(mensagem)
      } else {
        Alert.alert('Erro', mensagem)
      }
    }
  }

  function excluir(evento: Evento) {
    if (!token) return

    if (Platform.OS === 'web') {
      if (window.confirm(`Excluir o evento "${evento.nome}"?`)) {
        excluirEventoComErro(evento)
      }
      return
    }

    Alert.alert('Excluir evento', `Excluir o evento "${evento.nome}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => excluirEventoComErro(evento),
      },
    ])
  }

  async function sairDaConta() {
    await sair()
    router.replace('/')
  }

  return (
    <SafeAreaView style={styles.pagina}>
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>Meus Eventos</Text>
          <Text style={styles.nome}>{nome ?? 'Administrador'}</Text>
        </View>
        <Pressable style={styles.botaoSair} onPress={sairDaConta}>
          <Text style={styles.textoBotaoSair}>Sair</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.botaoAdicionar}
        onPress={() => {
          setModo('criar')
          setEventoEditando(null)
          setModalAberto(true)
        }}
      >
        <Text style={styles.textoAdicionar}>+ Adicionar Evento</Text>
      </Pressable>

      {carregando ? (
        <ActivityIndicator style={styles.carregando} color={cores.primaria} size="large" />
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhum evento cadastrado ainda.</Text>}
          renderItem={({ item }) => (
            <EventCard
              evento={item}
              onEditar={(evento) => {
                setModo('editar')
                setEventoEditando(evento)
                setModalAberto(true)
              }}
              onExcluir={excluir}
            />
          )}
        />
      )}

      <EventFormModal
        visivel={modalAberto}
        modo={modo}
        evento={eventoEditando ?? undefined}
        salvar={salvar}
        fechar={() => setModalAberto(false)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: espacamento.md,
    paddingVertical: espacamento.md,
    backgroundColor: cores.superficie,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '600',
    color: cores.texto,
  },
  nome: {
    fontSize: 13,
    color: cores.textoSuave,
    marginTop: 2,
  },
  botaoSair: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: espacamento.md,
    paddingVertical: espacamento.sm,
    borderRadius: raio.sm,
  },
  textoBotaoSair: {
    color: cores.textoClaro,
    fontWeight: '600',
    fontSize: 13,
  },
  botaoAdicionar: {
    margin: espacamento.md,
    backgroundColor: cores.primaria,
    borderRadius: raio.sm,
    paddingVertical: 13,
    alignItems: 'center',
  },
  textoAdicionar: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  lista: {
    paddingHorizontal: espacamento.md,
    paddingBottom: espacamento.xl,
    gap: espacamento.md,
  },
  vazio: {
    textAlign: 'center',
    color: cores.textoSuave,
    fontSize: 15,
    marginTop: 40,
  },
  carregando: {
    flex: 1,
  },
})
