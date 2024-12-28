import { View, Text } from 'react-native'
import React from 'react'
import Navigation from '@navigation/Navigation'
import SplashScreen from '@features/auth/SplashScreen'
// Now we are using absolute path

const App = () => {
  return (
    <View>
      <Text>App</Text>
      <Navigation />
      <SplashScreen />
    </View>
  )
}

export default App