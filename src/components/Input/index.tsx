import { RefObject } from 'react'
import { TextInputProps, TextInput } from 'react-native'
import { useTheme } from 'styled-components/native'

import { InputContainer } from './styles'

type InputProps = TextInputProps & {
  inputRef?: RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: InputProps) {
  const { COLORS } = useTheme()

  return (
    <InputContainer
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  )
}
