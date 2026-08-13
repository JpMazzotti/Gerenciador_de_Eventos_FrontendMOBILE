import { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'

import type { Evento } from '../types'
import { cores, espacamento, raio } from '../utils/theme'
import { isoParaTexto, mascaraData, textoParaISO } from '../utils/date'
import { Button } from './Button'
import { Input } from './Input'

export interface EventoFormData {
  nome: string
  data: string
  localizacao: string
  imagem: string
}

interface EventFormModalProps {
  visivel: boolean
  modo: 'criar' | 'editar'
  evento?: Evento
  salvar: (dados: EventoFormData) => void
  fechar: () => void
}

export function EventFormModal({ visivel, modo, evento, salvar, fechar }: EventFormModalProps) {
  const [nome, setNome] = useState('')
  const [textoData, setTextoData] = useState('')
  const [localizacao, setLocalizacao] = useState('')
  const [imagem, setImagem] = useState('')
  const [erroData, setErroData] = useState<string | null>(null)

  function abrir() {
    setNome(evento?.nome ?? '')
    setTextoData(isoParaTexto(evento?.data ?? ''))
    setLocalizacao(evento?.localizacao ?? '')
    setImagem(evento?.imagem ?? '')
    setErroData(null)
  }

  function concluir() {
    const data = textoParaISO(textoData)
    if (!data) {
      setErroData('Data inválida. Use o formato DD/MM/AAAA.')
      return
    }
    setErroData(null)
    salvar({ nome, data, localizacao, imagem })
  }

  const titulo = modo === 'criar' ? 'Adicionar Evento' : 'Editar Evento'

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={fechar}
      onShow={abrir}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={fechar} />
        <View style={styles.modal}>
          <Text style={styles.titulo}>{titulo}</Text>

          <View style={styles.formulario}>
            {modo === 'criar' && (
              <Input
                rotulo="Nome do evento"
                value={nome}
                onChangeText={setNome}
                placeholder="Ex.: Hackathon Neki"
              />
            )}

            <Input
              rotulo="Data"
              value={textoData}
              onChangeText={(t) => setTextoData(mascaraData(t))}
              placeholder="DD/MM/AAAA"
              keyboardType="numbers-and-punctuation"
              maxLength={10}
            />
            {erroData && <Text style={styles.erroData}>{erroData}</Text>}

            <Input
              rotulo="Localização"
              value={localizacao}
              onChangeText={setLocalizacao}
              placeholder="Ex.: São Paulo - SP"
            />

            {modo === 'criar' && (
              <Input
                rotulo="Imagem (URL)"
                value={imagem}
                onChangeText={setImagem}
                placeholder="https://..."
                autoCapitalize="none"
                keyboardType="url"
              />
            )}
          </View>

          <View style={styles.acoes}>
            <Button titulo="Salvar" onPress={concluir} />
            <Button titulo="Cancelar" variante="secundaria" onPress={fechar} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: espacamento.md,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    backgroundColor: cores.superficie,
    borderRadius: raio.lg,
    padding: espacamento.lg,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: espacamento.md,
  },
  formulario: {
    gap: espacamento.md,
  },
  erroData: {
    backgroundColor: cores.perigoFundo,
    color: cores.perigo,
    padding: 10,
    borderRadius: raio.sm,
    fontSize: 13,
  },
  acoes: {
    flexDirection: 'row',
    gap: espacamento.sm,
    marginTop: espacamento.lg,
  },
})
