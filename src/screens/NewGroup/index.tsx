import { useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { NewGroupContainer, Content, Icon } from './styles'
import { useNavigation } from '@react-navigation/native'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const { navigate } = useNavigation()

  function handleNewGroup() {
    navigate('players', { group })
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

          <Input placeholder="Nome da turma" onChangeText={setGroup} />

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
