import { View, Animated as RNAnimated, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useAuthStore } from '@state/authStore'
import NoticeAnimation from './NoticeAnimation'
import { NoticeHeight } from '@utils/Scaling'
import Visuals from './Visuals'
import { CollapsibleContainer, CollapsibleHeaderContainer, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import AnimatedHeader from './AnimatedHeader'

const NOTICE_HEIGHT = -(NoticeHeight + 12)
const ProductDashboard = () => {
    const { user } = useAuthStore()
    console.log("this is user ------ product Dashboard---------------- ", user)

    const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current
    const slideUp = () => {
        RNAnimated.timing(noticePosition, {
            toValue: NOTICE_HEIGHT,
            duration: 1200,
            useNativeDriver: false
        }).start()
    }

    const slideDown = () => {
        RNAnimated.timing(noticePosition, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: false
        }).start()
    }
    useEffect(() => {
        slideDown()
        const timeoutId = setTimeout(() => {
            slideUp()
        }, 3500)

        return () => clearTimeout(timeoutId)
    }, [])

    return (
        <NoticeAnimation noticePosition={noticePosition} >

            <>
                <Visuals />
                <SafeAreaView />
                <View style={{ flex: 1 }}>
                    {/* <Text>
                        ProductDashBoard
                    </Text> */}

                    <CollapsibleContainer style={styles.panelContainer}>
                        <CollapsibleHeaderContainer containerStyle={styles.transparent}>

                            <AnimatedHeader

                                showNotice={() => {
                                    slideDown()
                                    const timeoutId = setTimeout(() => {
                                        slideUp()
                                    }, 3500)
                                    return () => clearTimeout(timeoutId)
                                }}
                            />
                        </CollapsibleHeaderContainer>
                    </CollapsibleContainer>
                </View>
            </>
        </NoticeAnimation>
    )
}



const styles = StyleSheet.create({
    panelContainer: {
        flex: 1
    },
    transparent: {
        backgroundColor: 'transparent'
    }
})
// export default ProductDashboard


// to use collapsable container e need to wrap inside withCollapsable context
export default withCollapsibleContext(ProductDashboard)