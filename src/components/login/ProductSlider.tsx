import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC, useMemo } from 'react'
import { imageData } from '@utils/dummyData'

import AutoScroll from '@homielab/react-native-auto-scroll'
import { screenHeight, screenWidth } from '@utils/Scaling'

const ProductSlider = () => {
    const rows = useMemo(() => {
        const result = []
        for (let i = 0; i < imageData.length; i += 4) {
            result.push(imageData.slice(i, i + 4))
        }
        // Show only 3 rows
        return result.slice(0, 3)
    }, [])

    return (
        <View style={styles.container}>
            <AutoScroll style={styles.autoScroll} endPaddingWidth={0} duration={10000}>
                <View style={styles.gridContainer}>
                    {rows.map((row: any, rowIndex: number) => {
                        return <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex} />
                    })}
                </View>
            </AutoScroll>
        </View>
    )
}

const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({ row, rowIndex }) => {
    return (

        <View style={styles.row}>
            {row.map((image, imageIndex) => {

                const horizontalShift = rowIndex % 2 === 0 ? -30 : 30
                return (
                    <View key={imageIndex} style={[styles.itemContainer, { transform: [{ translateX: horizontalShift }] }]}>
                        <Image source={image} style={styles.image} />
                    </View>
                )
            })}
        </View>
    )
}

const MemoizedRow = React.memo(Row)

const styles = StyleSheet.create({
    container: {
        height: screenHeight * 0.6,
        justifyContent: 'space-between',
        paddingVertical: 10,
        overflow: 'hidden',
    },
    gridContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
    },
    autoScroll: {
        position: 'absolute',
        zIndex: -2,
    },
    row: {
        flexDirection: 'row',
        marginBottom: screenHeight * 0.02,
    },
    itemContainer: {
        marginTop: 10,
        marginHorizontal: 10,
        width: screenWidth * 0.3,
        height: screenHeight * 0.15,
        backgroundColor: '#e9f7f8',
        justifyContent: 'center',
        borderRadius: 25,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
})

export default ProductSlider
