import { Pressable, StyleSheet, Text } from 'react-native'

import { cores, espacamento, raio } from '../utils/theme'

interface ButtonProps {
  titulo: string
  onPress: () => void
  variante?: 'primaria' | 'secundaria' | 'perigo'
  desabilitado?: boolean
}

export function Button({ titulo, onPress, variante = 'primaria', desabilitado = false }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variante === 'primaria' && styles.primaria,
        variante === 'secundaria' && styles.secundaria,
        variante === 'perigo' && styles.perigo,
        pressed && styles.pressionado,
        desabilitado && styles.desabilitado,
      ]}
      onPress={onPress}
      disabled={desabilitado}
    >
      <Text style={[styles.texto, variante !== 'primaria' && styles.textoEscuro]}>
        {titulo}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 13,
    paddingHorizontal: espacamento.md,
    borderRadius: raio.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaria: {
    backgroundColor: cores.primaria,
  },
  secundaria: {
    backgroundColor: '#e2e8f0',
  },
  perigo: {
    backgroundColor: cores.perigoFundo,
  },
  pressionado: {
    opacity: 0.85,
  },
  desabilitado: {
    opacity: 0.6,
  },
  texto: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  textoEscuro: {
    color: cores.textoClaro,
  },
})
