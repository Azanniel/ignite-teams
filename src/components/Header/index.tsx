import { HeaderContainer, BackButton, BackIcon, Logo } from './styles'

import logo from '@assets/logo.png'

type HeaderProps = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {
  return (
    <HeaderContainer>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logo} />
    </HeaderContainer>
  )
}
