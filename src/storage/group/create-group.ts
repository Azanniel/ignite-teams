import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-config'
import { findManyGroups } from './find-many-groups'
import { GroupAlreadyExistsError } from '@utils/errors/group-already-exists-error'
import { GroupStorageDTO } from './group-storage-dto'

export async function createGroup(name: string): Promise<GroupStorageDTO> {
  const storedGroups = await findManyGroups()

  const doesGroupAlreadyExists = storedGroups.find((item) => item.name === name)

  if (doesGroupAlreadyExists) {
    throw new GroupAlreadyExistsError()
  }

  const group: GroupStorageDTO = {
    id: uuid.v4().toString(),
    name,
  }

  const groups = JSON.stringify([...storedGroups, group])

  await AsyncStorage.setItem(GROUP_COLLECTION, groups)

  return group
}
