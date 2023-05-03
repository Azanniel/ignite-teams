import { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { createGroup } from '@storage/group/create-group'
import { GroupAlreadyExistsError } from '@utils/errors/group-already-exists-error'

import { NewGroupContainer, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  async function handleNewGroup() {
    try {
      if (!group.trim()) {
        return Alert.alert('Novo grupo', 'Informe o nome da turma.')
      }

      const storedGroup = await createGroup(group)

      setGroup('')

      navigation.reset({
        index: 1,
        routes: [
          { name: 'groups' },
          { name: 'players', params: { groupId: storedGroup.id } },
        ],
      })
    } catch (error) {
      if (error instanceof GroupAlreadyExistsError) {
        return Alert.alert('Novo grupo', error.message)
      }

      Alert.alert('Novo grupo', 'Não foi possível criar um novo grupo')
      console.error(error)
    }
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      behavior="padding"
      style={{ flex: 1 }}
    >
      <NewGroupContainer>
        <Header showBackButton />

        <Content>
          <Icon />
          <Highlight
            title="Nova turma"
            subtitle="crie uma turma para adicionar as pessoas"
          />

          <Input
            placeholder="Nome da turma"
            onChangeText={setGroup}
            value={group}
          />

          <Button
            title="Criar"
            style={{ marginTop: 20 }}
            onPress={handleNewGroup}
          />
        </Content>
      </NewGroupContainer>
    </KeyboardAvoidingView>
  )
}
