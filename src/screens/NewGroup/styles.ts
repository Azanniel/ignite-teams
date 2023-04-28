import { SafeAreaView } from 'react-native-safe-area-context'
import { UsersThree, IconProps } from 'phosphor-react-native'
import styled from 'styled-components/native'

export const NewGroupContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 24px;
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`

export const Icon = styled(UsersThree).attrs(
  ({ theme }): IconProps => ({
    size: 56,
    color: theme.COLORS.GREEN_700,
  }),
)`
  align-self: center;
`
