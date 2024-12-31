import { Animated, StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import ProductSlider from '@components/login/ProductSlider'
import { resetAndNavigate } from '@utils/NavigationUtils'

const CustomerLogin = () => {

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <CustomSafeAreaView>
                    <ProductSlider />

                    {/* Image And Login Input Field */}

                </CustomSafeAreaView>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
    gestureArea: {
        flex: 1,
        backgroundColor: 'rgba(20, 9, 9, 0.3)',
    },
})

export default CustomerLogin
