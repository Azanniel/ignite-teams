import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPlayersByGroup } from './get-players-by-group'
import { PLAYER_COLLECTION } from '@storage/storage-config'

export async function removePlayerByGroup(playerId: string, groupId: string) {
  const storedPlayers = await getPlayersByGroup(groupId)
  const playersWithoutOne = storedPlayers.filter((player) => {
    return player.id !== playerId
  })

  const TEAM_COLLECTION = `${PLAYER_COLLECTION}-${groupId}`

  await AsyncStorage.setItem(TEAM_COLLECTION, JSON.stringify(playersWithoutOne))
}
