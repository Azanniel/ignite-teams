import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-config'
import { GroupStorageDTO } from './group-storage-dto'
import { GroupWasNotFoundError } from '@utils/errors/group-was-not-found-error'

export async function findGroupById(groupId: string) {
  const storage = await AsyncStorage.getItem(GROUP_COLLECTION)

  if (!storage) {
    throw new GroupWasNotFoundError()
  }

  const groups = JSON.parse(storage) as GroupStorageDTO[]
  const group = groups.find((item) => item.id === groupId)

  if (!group) {
    throw new GroupWasNotFoundError()
  }

  return group
}
