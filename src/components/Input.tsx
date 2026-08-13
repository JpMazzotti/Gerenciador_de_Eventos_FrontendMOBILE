import { StyleSheet, Text, TextInput, View } from 'react-native'
import type { TextInputProps } from 'react-native'

import { cores, espacamento, raio } from '../utils/theme'

interface InputProps extends TextInputProps {
  rotulo: string
}

export function Input({ rotulo, ...props }: InputProps) {
  return (
    <View style={styles.campo}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={cores.textoSuave}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  campo: {
    gap: espacamento.xs,
  },
  rotulo: {
    fontSize: 13,
    fontWeight: '600',
    color: cores.textoClaro,
  },
  input: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.sm,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: cores.texto,
  },
})
