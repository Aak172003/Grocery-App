import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from '@features/auth/SplashScreen'
import { navigationRef } from '@utils/NavigationUtils'
import CustomerLogin from '@features/auth/CustomerLogin'
import DeliveryLogin from '@features/auth/DeliveryLogin'

const Stack = createNativeStackNavigator()
const Navigation = () => {

    return (
        <NavigationContainer ref={navigationRef}>
            {/* Initial route */}
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    // This is responsible to show header
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DeliveryLogin"
                    component={DeliveryLogin}
                    // This is responsible to show header
                    options={{ headerShown: true, animation: 'fade' }}
                />
                <Stack.Screen
                    name="CustomerLogin"
                    component={CustomerLogin}
                    // This is responsible to show header
                    options={{ headerShown: false, animation: 'fade' }}
                />

            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Navigation