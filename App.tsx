import { StatusBar } from 'react-native'
import { useFonts } from 'expo-font'
import { ThemeProvider } from 'styled-components/native'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { Groups } from '@screens/Groups'
import { Loading } from '@components/Loading'
import { theme } from './src/theme'

export default function App() {
  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {isFontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  )
}
