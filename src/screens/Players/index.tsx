import { useState } from 'react'
import { FlatList } from 'react-native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'

import { PlayersContainer, Form, HeaderList, NumbersOfPlayers } from './styles'

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players] = useState(['Leandro', 'Azanniel', 'Lima'])

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
    </PlayersContainer>
  )
}
