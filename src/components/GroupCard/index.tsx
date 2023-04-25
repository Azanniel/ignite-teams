import { TouchableOpacityProps } from 'react-native'
import { GroupCardContainer, Icon, Title } from './styles'

type GroupCardProps = TouchableOpacityProps & {
  title: string
}

export function GroupCard({ title, ...rest }: GroupCardProps) {
  return (
    <GroupCardContainer {...rest}>
      <Icon />

      <Title>{title}</Title>
    </GroupCardContainer>
  )
}
