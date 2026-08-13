import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import type { Evento } from '../types'
import { cores, espacamento, raio } from '../utils/theme'

interface EventCardProps {
  evento: Evento
  onEditar: (evento: Evento) => void
  onExcluir: (evento: Evento) => void
}

export function EventCard({ evento, onEditar, onExcluir }: EventCardProps) {
  return (
    <View style={styles.card}>
      {evento.imagem ? (
        <Image source={{ uri: evento.imagem }} style={styles.imagem} resizeMode="cover" />
      ) : (
        <View style={styles.semImagem}>
          <Text style={styles.textoSemImagem}>Sem imagem</Text>
        </View>
      )}

      <View style={styles.corpo}>
        <Text style={styles.titulo} numberOfLines={2}>
          {evento.nome}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.rotulo}>Data: </Text>
          {evento.data}
        </Text>
        <Text style={styles.info} numberOfLines={2}>
          <Text style={styles.rotulo}>Local: </Text>
          {evento.localizacao}
        </Text>

        <View style={styles.acoes}>
          <Pressable style={styles.botaoEditar} onPress={() => onEditar(evento)}>
            <Text style={styles.textoBotao}>Editar</Text>
          </Pressable>
          <Pressable style={styles.botaoExcluir} onPress={() => onExcluir(evento)}>
            <Text style={styles.textoBotaoExcluir}>Excluir</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.superficie,
    borderRadius: raio.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imagem: {
    width: '100%',
    height: 150,
    backgroundColor: '#e2e8f0',
  },
  semImagem: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eceff1',
  },
  textoSemImagem: {
    color: cores.textoSuave,
    fontSize: 14,
  },
  corpo: {
    padding: espacamento.md,
    gap: espacamento.xs,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '600',
    color: cores.texto,
  },
  info: {
    fontSize: 14,
    color: cores.textoClaro,
  },
  rotulo: {
    fontWeight: '600',
  },
  acoes: {
    flexDirection: 'row',
    gap: espacamento.sm,
    marginTop: espacamento.sm,
  },
  botaoEditar: {
    flex: 1,
    backgroundColor: cores.primaria,
    borderRadius: raio.sm,
    paddingVertical: 10,
    alignItems: 'center',
  },
  botaoExcluir: {
    flex: 1,
    backgroundColor: cores.perigoFundo,
    borderRadius: raio.sm,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#ffffff',
    fontWeight: '600',
  },
  textoBotaoExcluir: {
    color: cores.perigo,
    fontWeight: '600',
  },
})
