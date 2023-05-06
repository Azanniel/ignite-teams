import AsyncStorage from '@react-native-async-storage/async-storage'
import { findManyGroups } from './find-many-groups'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storage-config'

export async function removeGroupById(groupId: string) {
  const storedGroups = await findManyGroups()
  const groupsWithoutOneDeleted = storedGroups.filter((group) => {
    return group.id !== groupId
  })

  await AsyncStorage.setItem(
    GROUP_COLLECTION,
    JSON.stringify(groupsWithoutOneDeleted),
  )

  const TEAM_COLLECTION = `${PLAYER_COLLECTION}-${groupId}`

  await AsyncStorage.removeItem(TEAM_COLLECTION)
}
