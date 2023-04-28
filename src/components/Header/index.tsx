import { useNavigation } from '@react-navigation/native'
import { HeaderContainer, BackButton, BackIcon, Logo } from './styles'

import logo from '@assets/logo.png'

type HeaderProps = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {
  const { navigate } = useNavigation()

  function handleGoBack() {
    navigate('groups')
  }

  return (
    <HeaderContainer>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logo} />
    </HeaderContainer>
  )
}
