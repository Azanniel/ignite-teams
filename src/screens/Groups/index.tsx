import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'

import { GroupsContainer } from './styles'
import { GroupCard } from '@components/GroupCard'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { ListEmpty } from '@components/ListEmpty'

export function Groups() {
  const [groups] = useState<string[]>([
    'Galera da Rocketseat',
    'Galera da Creathus',
    'Galera da ATX',
  ])

  return (
    <GroupsContainer>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return <GroupCard title={item} />
        }}
        contentContainerStyle={
          groups.length === 0 && {
            flex: 1,
          }
        }
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />
    </GroupsContainer>
  )
}
