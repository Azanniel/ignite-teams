import { useCallback, useEffect, useState, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import { GroupStorageDTO } from '@storage/group/group-storage-dto'
import { PlayerStorageDTO } from '@storage/players/player-storage-dto'
import { findGroupById } from '@storage/group/find-group-by-id'
import { createPlayerByGroup } from '@storage/players/create-player-by-group'
import { getPlayersByGroupAndTeam } from '@storage/players/get-players-by-group-and-team'
import { removePlayerByGroup } from '@storage/players/remove-player-by-group'
import { removeGroupById } from '@storage/group/remove-group-by-id'
import { PlayerAlreadyExistsError } from '@utils/errors/player-already-exists-error'

import { PlayersContainer, Form, HeaderList, NumbersOfPlayers } from './styles'

type RouteParams = {
  groupId: string
}

export function Players() {
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(true)
  const [isLoadingGroup, setIsLoadingGroup] = useState(true)
  const [group, setGroup] = useState<GroupStorageDTO>({} as GroupStorageDTO)
  const [team, setTeam] = useState('Time A')
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation()
  const route = useRoute()
  const { groupId } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function fetchCurrentGroup(group: string) {
    try {
      const response = await findGroupById(group)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        'Novo jogador(a)',
        'Informe o nome da pessoa para adicionar.',
      )
    }

    try {
      await createPlayerByGroup(
        {
          name: newPlayerName,
          team,
        },
        groupId,
      )

      newPlayerNameInputRef.current?.blur()
      setNewPlayerName('')

      await fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof PlayerAlreadyExistsError) {
        return Alert.alert('Novo jogador(a)', error.message)
      }

      console.log(error)
      Alert.alert('Novo jogador(a)', 'Não foi possível adicionar')
    }
  }

  async function handleRemovePlayer(playerId: string) {
    try {
      await removePlayerByGroup(playerId, groupId)
      await fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover jogador(a)', 'Não foi possível remover o jogador(a)')
    }
  }

  async function removeGroup() {
    try {
      await removeGroupById(groupId)
      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover turma', 'Não foi possível remover a turma')
    }
  }

  async function handleRemoveGroup() {
    Alert.alert('Remover turma', 'Desejar remover a turma?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: removeGroup },
    ])
  }

  const fetchPlayersByTeam = useCallback(async () => {
    try {
      setIsLoadingPlayers(true)
      const playersByTeam = await getPlayersByGroupAndTeam(groupId, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Jogadores',
        'Não foi possível carregar os jogadores pelo time selecionado',
      )
    } finally {
      setIsLoadingPlayers(false)
    }
  }, [groupId, team])

  useEffect(() => {
    fetchPlayersByTeam()
  }, [fetchPlayersByTeam])

  useEffect(() => {
    fetchCurrentGroup(groupId).then((response) => {
      if (response) {
        setGroup(response)
        setIsLoadingGroup(false)
      }
    })
  }, [groupId])

  if (isLoadingGroup) {
    return <Loading />
  }

  return (
    <PlayersContainer>
      <Header showBackButton />

      <Highlight
        title={group.name}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
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

      {isLoadingPlayers ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <PlayerCard
                name={item.name}
                onRemove={() => handleRemovePlayer(item.id)}
              />
            )
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
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </PlayersContainer>
  )
}
