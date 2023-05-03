import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

import { Group } from '@storage/group/group-interface'
import { findGroupById } from '@storage/group/find-group-by-id'

import { PlayersContainer, Form, HeaderList, NumbersOfPlayers } from './styles'

type RouteParams = {
  groupId: string
}

export function Players() {
  const [group, setGroup] = useState<Group>({} as Group)
  const [team, setTeam] = useState('Time A')
  const [players] = useState([
    'Leandro',
    'Hianca',
    'Adriel',
    'Bruce',
    'Kleyson',
  ])

  const route = useRoute()
  const { groupId } = route.params as RouteParams

  async function fetchCurrentGroup(groupId: string) {
    try {
      const response = await findGroupById(groupId)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCurrentGroup(groupId).then((response) => {
      if (response) {
        setGroup(response)
      }
    })
  }, [groupId])

  return (
    <PlayersContainer>
      <Header showBackButton />

      <Highlight
        title={group.name}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            return (
              <Filter
                title={item}
                isActive={team === item}
                onPress={() => setTeam(item)}
              />
            )
          }}
          horizontal
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return <PlayerCard name={item} onRemove={() => {}} />
        }}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover turma" type="SECONDARY" />
    </PlayersContainer>
  )
}
