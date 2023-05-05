import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

import { GroupStorageDTO } from '@storage/group/group-storage-dto'
import { findManyGroups } from '@storage/group/find-many-groups'

import { GroupsContainer } from './styles'

export function Groups() {
  const [groups, setGroups] = useState<GroupStorageDTO[]>([])

  const { navigate } = useNavigation()

  function handleNavigateToNewGroup() {
    navigate('new')
  }

  async function fetchGroups() {
    try {
      const response = await findManyGroups()
      setGroups(response)
    } catch (error) {
      console.error(error)
    }
  }

  function handleOpenGroup(groupId: string) {
    navigate('players', { groupId })
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
          return (
            <GroupCard
              title={item.name}
              onPress={() => handleOpenGroup(item.id)}
            />
          )
        }}
        contentContainerStyle={
          groups.length === 0 && {
            flex: 1,
          }
        }
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button title="Criar nova turma" onPress={handleNavigateToNewGroup} />
    </GroupsContainer>
  )
}
