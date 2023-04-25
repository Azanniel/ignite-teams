import { TouchableOpacityProps } from 'react-native'
import { ButtonContainer, Title, ButtonTypeStyleProps } from './styles'

type ButtonProps = TouchableOpacityProps & {
  title: string
  type?: ButtonTypeStyleProps
}

export function Button({ title, type = 'PRIMARY', ...rest }: ButtonProps) {
  return (
    <ButtonContainer type={type} {...rest}>
      <Title>{title}</Title>
    </ButtonContainer>
  )
}
