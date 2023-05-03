import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { GROUP_COLLECTION } from '@storage/storage-config'
import { findManyGroups } from './find-many-groups'
import { GroupAlreadyExistsError } from '@utils/errors/group-already-exists-error'
import { Group } from './group-interface'

export async function createGroup(name: string): Promise<Group> {
  const storedGroups = await findManyGroups()

  const doesGroupAlreadyExists = storedGroups.find((item) => item.name === name)

  if (doesGroupAlreadyExists) {
    throw new GroupAlreadyExistsError()
  }

  const group: Group = {
    id: uuid.v4().toString(),
    name,
  }

  const groups = JSON.stringify([...storedGroups, group])

  await AsyncStorage.setItem(GROUP_COLLECTION, groups)

  return group
}
