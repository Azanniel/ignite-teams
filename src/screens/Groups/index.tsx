import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { Group, groupGetAll } from '@storage/group/group-get-all'

import { GroupsContainer } from './styles'

export function Groups() {
  const [groups, setGroups] = useState<Group[]>([])

  const { navigate } = useNavigation()

  function handleNavigateToNewGroup() {
    navigate('new')
  }

  async function fetchGroups() {
    try {
      const response = await groupGetAll()
      setGroups(response)
    } catch (error) {
      console.error(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  return (
    <GroupsContainer>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <GroupCard title={item.name} />
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

      <Button title="Criar nova turma" onPress={handleNavigateToNewGroup} />
    </GroupsContainer>
  )
}
