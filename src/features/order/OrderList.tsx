import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useCartStore } from '@state/cartStore'
import clockIcon from '@assets/icons/clock.png'
import CustomText from '@components/ui/CustomText'
import { Colors, Fonts } from '@utils/Constants'
import OrderItem from './OrderItem'

const OrderList = () => {

    const cartItem = useCartStore((state) => state.cart)


    const totalItems = cartItem?.reduce((acc, cart) => acc + cart?.count, 0)
    console.log("we have total items -------------- ", totalItems)

    console.log("cartItem from checkout page ------ ", cartItem)


    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <View style={styles.imageContainer}>
                    <Image source={clockIcon} style={styles.image} />
                </View>
                <View>
                    <CustomText varient='h5' fontFamily={Fonts.SemiBold}>
                        Delivery in 9 minutes
                    </CustomText>
                    <CustomText varient='h8' fontFamily={Fonts.SemiBold} style={{ opacity: 0.5 }}>
                        Shipement of {totalItems || 0} item
                    </CustomText>
                </View>
            </View>


            {cartItem?.map((item) => {
                return (
                    <OrderItem key={item?._id} item={item} />
                )
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 15,
        marginBottom: 15
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 10,
        paddingVertical: 12
    },
    image: {
        width: 30,
        height: 30
    },
    imageContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 15
    }
})
export default OrderList