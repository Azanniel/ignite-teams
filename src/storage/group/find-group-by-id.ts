import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-config'
import { Group } from './group-interface'

export async function findGroupById(groupId: string): Promise<Group> {
  const storage = await AsyncStorage.getItem(GROUP_COLLECTION)

  if (!storage) {
    throw new Error('Group was not found')
  }

  const groups = JSON.parse(storage) as Group[]
  const group = groups.find((item) => item.id === groupId)

  if (!group) {
    throw new Error('Group was not found')
  }

  return group
}
