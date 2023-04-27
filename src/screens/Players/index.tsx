import { useState } from 'react'
import { FlatList } from 'react-native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

import { PlayersContainer, Form, HeaderList, NumbersOfPlayers } from './styles'

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players] = useState([
    'Leandro',
    'Hianca',
    'Adriel',
    'Bruce',
    'Kleyson',
  ])

  return (
    <PlayersContainer>
      <Header showBackButton />

      <Highlight
        title="Nome de turma"
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
