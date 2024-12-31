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
            <Stack.Navigator
                initialRouteName="SplashScreen"
                screenOptions={{
                    animation: 'fade',
                }}
            >
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DeliveryLogin"
                    component={DeliveryLogin}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CustomerLogin"
                    component={CustomerLogin}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Navigation