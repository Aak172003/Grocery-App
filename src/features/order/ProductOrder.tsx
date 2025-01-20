import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '@components/ui/CustomHeader'

const ProductOrder = () => {
    return (
        <View>
            <CustomHeader title="Cart Item" search={false} />

            <Text>ProductOrder</Text>
        </View>
    )
}

export default ProductOrder