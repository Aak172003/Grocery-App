import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import ProductSlider from '@components/login/ProductSlider'

const CustomerLogin: FC = () => {

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>

                {/* This is custom safe area view , this make all things present in same boundary */}
                <CustomSafeAreaView>
                    {/* <Text>Aakash Prajapati</Text> */}
                    <ProductSlider />

                </CustomSafeAreaView>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    // Which means this show on entire screen
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
})
export default CustomerLogin