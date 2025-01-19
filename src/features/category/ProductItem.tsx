import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import { screenHeight } from '@utils/Scaling'

const ProductItem: FC<{ item: any, index: number }> = ({ item, index }) => {

    const isSecondColumn = index % 2 != 0
    return (
        <View style={[styles.conatiner, { marginRight: isSecondColumn ? 10 : 0 }]}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
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
        overflow: 'hidden'
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
    }
})
export default ProductItem