import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { screenHeight, screenWidth } from '@utils/Scaling'
import Logo from '@assets/images/splash_logo.jpeg'
import { Colors } from '@utils/Constants'

import GeoLocation from '@react-native-community/geolocation'
import Geolocation from '@react-native-community/geolocation'
import { tokenStoage } from '@state/storage'
import { useAuthStore } from '@state/authStore'
import { resetAndNavigate } from '@utils/NavigationUtils'

// Geo Location Configuration
GeoLocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto'
})

const SplashScreen = () => {

    const { user, setUser } = useAuthStore()

    const tokenCheck = async () => {
        const accessToken = tokenStoage.getString('accessToken') as string
        const refreshToken = tokenStoage.getString('refreshToken') as string


        if (accessToken) {

        }

        resetAndNavigate("CustomerLogin")

        return false
    }
    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                Geolocation.requestAuthorization()
                tokenCheck()
            } catch (error) {
                Alert.alert("Sorry we need location service to give you better shopping experience")
            }
        }

        const timeoutId = setTimeout(fetchUserLocation, 5000)
        return () => clearTimeout(timeoutId)
    }, [])


    return (
        <View style={Styles.container}>
            <Image source={Logo} style={Styles.logoImage} />
        </View>
    )
}

export default SplashScreen


const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        height: screenHeight * 0.7,
        width: screenWidth * 0.7,
        resizeMode: 'contain'
    }
})