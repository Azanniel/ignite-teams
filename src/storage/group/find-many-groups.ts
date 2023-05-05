import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-config'
import { GroupStorageDTO } from './group-storage-dto'

export async function findManyGroups() {
  const storage = await AsyncStorage.getItem(GROUP_COLLECTION)

  const groups: GroupStorageDTO[] = storage ? JSON.parse(storage) : []

  return groups
}
