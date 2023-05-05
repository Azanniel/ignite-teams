import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '@storage/storage-config'
import { PlayerStorageDTO } from './player-storage-dto'

export async function getPlayersByGroup(groupId: string) {
  const TEAM_COLLECTION = `${PLAYER_COLLECTION}-${groupId}`

  const storage = await AsyncStorage.getItem(TEAM_COLLECTION)

  const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : []

  return players
}
