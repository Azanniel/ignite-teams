import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { GROUP_COLLECTION } from '@storage/storage-config'
import { Group, groupGetAll } from './group-get-all'

export async function groupCreate(name: string) {
  const storedGroups = await groupGetAll()

  const newGroup: Group = {
    id: uuid.v4().toString(),
    name,
  }

  const groups = JSON.stringify([...storedGroups, newGroup])

  await AsyncStorage.setItem(GROUP_COLLECTION, groups)
}
