import { useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { NewGroupContainer, Content, Icon } from './styles'
import { useNavigation } from '@react-navigation/native'
import { groupCreate } from '@storage/group/group-create'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const { navigate } = useNavigation()

  async function handleNewGroup() {
    try {
      await groupCreate(group)

      setGroup('')

      navigate('players', { group })
    } catch (error) {
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
