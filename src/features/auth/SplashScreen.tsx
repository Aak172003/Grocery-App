import { View, StyleSheet, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { screenHeight, screenWidth } from '@utils/Scaling'
import Logo from '@assets/images/splash_logo.jpeg'
import { Colors } from '@utils/Constants'
import { jwtDecode } from 'jwt-decode'

import GeoLocation from '@react-native-community/geolocation'
import Geolocation from '@react-native-community/geolocation'
import { tokenStorage } from '@state/storage'
import { useAuthStore } from '@state/authStore'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { refetchUser, refresh_token } from '@service/AuthService'

// Geo Location Configuration
GeoLocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto'
})

interface DecodedToken {
    exp: number
}



const SplashScreen = () => {

    const { user, setUser } = useAuthStore()

    const tokenCheck = async () => {
        const accessToken = tokenStorage.getString('accessToken') as string
        const refreshToken = tokenStorage.getString('refreshToken') as string


        if (accessToken) {
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken)
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken)

            const currentTime = Date.now() / 1000

            // so basically first expires accesstoken , 
            if (decodedRefreshToken?.exp < currentTime) {
                resetAndNavigate('CustomerLogin')
                Alert.alert("Session Expired", "Please Login Again")
                return false
            }


            if (decodedAccessToken?.exp < currentTime) {
                try {
                    console.log("access token expires")
                    // if token expires but refreshToken not expires , then refreshtoken will refresh accessToken
                    refresh_token()
                    await refetchUser(setUser)

                } catch (error) {
                    Alert.alert("There was an error while refreshing accessToken")
                    return false
                }
            }

            if (user?.role == "Customer") {
                resetAndNavigate("ProductDashboard")
            } else {
                resetAndNavigate("DeliveryDashboard")
            }
            return true
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