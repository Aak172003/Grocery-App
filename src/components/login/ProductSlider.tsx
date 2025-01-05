import { View, StyleSheet, Image, Animated } from 'react-native'
import React, { FC, useMemo, useRef, useState } from 'react'
import { PanGestureHandler, GestureHandlerRootView, State } from 'react-native-gesture-handler'
import { imageData } from '@utils/dummyData'

import AutoScroll from '@homielab/react-native-auto-scroll'
import { screenHeight, screenWidth } from '@utils/Scaling'
import { resetAndNavigate } from '@utils/NavigationUtils'

const ProductSlider = () => {
    const [gestureSequence, setGestureSequence] = useState<string[]>([])
    const translateX = useRef(new Animated.Value(0)).current
    const translateY = useRef(new Animated.Value(0)).current

    const handleGesture = ({ nativeEvent }: any) => {

        if (nativeEvent.state === State.END) {
            const { translationX, translationY } = nativeEvent
            let direction = ''

            // Determine direction
            if (Math.abs(translationX) > Math.abs(translationY)) {
                direction = translationX > 0 ? 'right' : 'left'
            } else {
                direction = translationY > 0 ? 'down' : 'up'
            }

            const newSequence = [...gestureSequence, direction].slice(-5)
            setGestureSequence(newSequence)
            console.log('direction ------------- ', direction)

            if (newSequence.join('') === 'up') {
                setGestureSequence([])
                console.log('Gesture Sequence Matched!')
                resetAndNavigate('DeliveryLogin')
            }
        }
    }


    console.log("gestureSequence :::::::::::::; ", gestureSequence)

    const onGestureEvent = Animated.event(
        [
            {
                nativeEvent: { translationX: translateX, translationY: translateY },
            },
        ],
        { useNativeDriver: true }
    )


    const rows = useMemo(() => {
        const result = []
        for (let i = 0; i < imageData.length; i += 4) {
            result.push(imageData.slice(i, i + 4))
        }
        return result.slice(0, 3)
    }, [])

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <AutoScroll style={styles.autoScroll} endPaddingWidth={0} duration={10000}>
                    <View style={styles.gridContainer}>
                        {rows.map((row: any, rowIndex: number) => (
                            <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex} />
                        ))}
                    </View>
                </AutoScroll>


                {/* From here Pan Gesture Handler Implement */}
                <PanGestureHandler onHandlerStateChange={handleGesture} onGestureEvent={onGestureEvent}>
                    <Animated.View
                        style={[
                            styles.gestureArea,
                            {
                                transform: [
                                    { translateX: translateX },
                                    { translateY: translateY },
                                ],
                            },
                        ]}
                    />
                </PanGestureHandler>
            </View>
        </GestureHandlerRootView>
    )
}

const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({ row, rowIndex }) => {
    return (
        <View style={styles.row}>
            {row.map((image, imageIndex) => {
                const horizontalShift = rowIndex % 2 === 0 ? -30 : 30
                return (
                    <View
                        key={imageIndex}
                        style={[styles.itemContainer, { transform: [{ translateX: horizontalShift }] }]}
                    >
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
        height: screenHeight * 0.54,
        justifyContent: 'space-between',
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
    gestureArea: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'red'
    },
})

export default ProductSlider
