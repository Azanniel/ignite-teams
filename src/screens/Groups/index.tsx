import { useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

import { GroupsContainer } from './styles'

export function Groups() {
  const [groups] = useState<string[]>([
    'Galera da Rocketseat',
    'Galera da Creathus',
    'Galera da ATX',
  ])

  const { navigate } = useNavigation()

  function handleNewGroup() {
    navigate('new')
  }

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

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </GroupsContainer>
  )
}
