import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { FC } from 'react'
import CustomHeader from '@components/ui/CustomHeader'
import { Colors } from '@utils/Constants'
import OrderList from './OrderList'

const ProductOrder: FC = () => {
    return (
        <View style={styles.container}>
            <CustomHeader title="Checkout" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <OrderList />
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    scrollContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        paddingBottom: 250
    }
})
export default ProductOrder