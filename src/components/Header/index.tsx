import { HeaderContainer, Logo } from './styles'

import logo from '@assets/logo.png'

export function Header() {
  return (
    <HeaderContainer>
      <Logo source={logo} />
    </HeaderContainer>
  )
}
