import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from '@features/auth/SplashScreen'
import { navigationRef } from '@utils/NavigationUtils'
import CustomerLogin from '@features/auth/CustomerLogin'
import DeliveryLogin from '@features/auth/DeliveryLogin'
import ProductDashboard from '@features/dashboard/ProductDashboard'
import DeliveryDashboard from '@features/delivery/DeliveryDashboard'
import ProductCategories from '@features/category/ProductCategories'

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
                    name="ProductDashboard"
                    component={ProductDashboard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DeliveryDashboard"
                    component={DeliveryDashboard}
                    options={{ headerShown: true }}
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
                <Stack.Screen
                    name="ProductCategories"
                    component={ProductCategories}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Navigation