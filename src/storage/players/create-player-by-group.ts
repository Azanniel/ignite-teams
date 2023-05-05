import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '@storage/storage-config'
import { PlayerStorageDTO } from './player-storage-dto'
import { getPlayersByGroup } from './get-players-by-group'
import { PlayerAlreadyExistsError } from '@utils/errors/player-already-exists-error'

interface NewPlayer {
  name: string
  team: string
}

export async function createPlayerByGroup(
  newPlayer: NewPlayer,
  groupId: string,
) {
  const storedPlayers = await getPlayersByGroup(groupId)

  const doesPlayerAlreadyExists =
    storedPlayers.find((item) => item.name === newPlayer.name) !== undefined

  if (doesPlayerAlreadyExists) {
    throw new PlayerAlreadyExistsError()
  }

  const player: PlayerStorageDTO = {
    id: uuid.v4().toString(),
    name: newPlayer.name,
    team: newPlayer.team,
  }

  const TEAM_COLLECTION = `${PLAYER_COLLECTION}-${groupId}`

  await AsyncStorage.setItem(
    TEAM_COLLECTION,
    JSON.stringify([...storedPlayers, player]),
  )

  return player
}
