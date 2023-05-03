import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-config'
import { Group } from './group-interface'

export async function findManyGroups() {
  const storage = await AsyncStorage.getItem(GROUP_COLLECTION)

  const groups: Group[] = storage ? JSON.parse(storage) : []

  return groups
}
