import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'

import { GroupsContainer } from './styles'
import { GroupCard } from '@components/GroupCard'

export function Groups() {
  return (
    <GroupsContainer>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <GroupCard title="Galera do Ignite" />
    </GroupsContainer>
  )
}
