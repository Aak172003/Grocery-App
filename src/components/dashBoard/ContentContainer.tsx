import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { adData } from '@utils/dummyData'

const ContentContainer = () => {
    return (
        <View style={styles.container}>
            <Text> Content Container </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    }
})
export default ContentContainer