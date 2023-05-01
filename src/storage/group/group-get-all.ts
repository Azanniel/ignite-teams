import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-config'

export interface Group {
  id: string
  name: string
}

export async function groupGetAll() {
  const storage = await AsyncStorage.getItem(GROUP_COLLECTION)

  const groups: Group[] = storage ? JSON.parse(storage) : []

  return groups
}
