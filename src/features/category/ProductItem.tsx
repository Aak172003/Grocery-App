import { View, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import { screenHeight } from '@utils/Scaling'
import clockIcon from '@assets/icons/clock.png'
import CustomText from '@components/ui/CustomText'
import { Colors, Fonts } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'

const ProductItem: FC<{ item: any, index: number }> = ({ item, index }) => {

    const isSecondColumn = index % 2 != 0
    return (
        <View style={[styles.conatiner, { marginRight: isSecondColumn ? 10 : 0 }]}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>

            <View style={styles.content}>

                <View style={styles.flexRow}>
                    <Image source={clockIcon} style={styles.clockIcon} />
                    <CustomText fontFamily={Fonts.Medium} fontSize={RFValue(6)}>8 Min</CustomText>
                </View>
                <CustomText
                    fontFamily={Fonts.Medium}
                    varient='h8' numberOfLines={2} style={{ marginVertical: 4 }}>
                    {item?.name}
                </CustomText>
                <View style={styles.priceContainer}>
                    <View>
                        <CustomText varient='h8' fontFamily={Fonts.Medium}>
                            ₹{item?.price}
                        </CustomText>
                        <CustomText varient='h8' fontFamily={Fonts.Medium} style={{ opacity: 0.7, textDecorationLine: 'line-through' }}>
                            ₹{item?.discountPrice}
                        </CustomText>
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    conatiner: {
        width: '45%',
        borderRadius: 10,
        backgroundColor: "white",
        marginLeft: 10,
        overflow: 'hidden',
        marginVertical: 7
    },
    imageContainer: {
        height: screenHeight * 0.12,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    image: {
        height: "100%",
        width: '100%',
        aspectRatio: 1 / 1,
        resizeMode: 'contain'
    },
    content: {
        flex: 1,
        paddingHorizontal: 10
    },
    flexRow: {
        flexDirection: 'row',
        padding: 2,
        borderRadius: 4,
        alignItems: 'center',
        gap: 2,
        backgroundColor: Colors.backgroundSecondary,
        alignSelf: 'flex-start'
    },
    clockIcon: {
        height: 15,
        width: 15
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: 10,
        marginTop: 'auto'
    }
})
export default ProductItem