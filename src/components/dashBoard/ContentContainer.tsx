import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { adData } from '@utils/dummyData'
import AddCarousal from './AddCarousal'

const ContentContainer = () => {
    return (
        <View style={styles.container}>
            <AddCarousal adData={adData} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    }
})
export default ContentContainer