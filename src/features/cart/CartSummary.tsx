import { View, Text } from 'react-native'
import React, { FC } from 'react'


interface CartSummaryProps {
    cartCount: number,
    cartImage: React.ReactNode
}
const CartSummary: FC<CartSummaryProps> = ({ cartCount, cartImage }) => {
    return (
        <View>
            <Text>CartSummary</Text>
        </View>
    )
}

export default CartSummary