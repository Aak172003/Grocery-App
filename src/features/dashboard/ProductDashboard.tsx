import { View, Animated as RNAnimated, Text, SafeAreaView, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import { useAuthStore } from '@state/authStore'
import NoticeAnimation from './NoticeAnimation'
import { NoticeHeight, screenHeight } from '@utils/Scaling'
import Visuals from './Visuals'
import { CollapsibleContainer, CollapsibleHeaderContainer, CollapsibleScrollView, useCollapsibleContext, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import AnimatedHeader from './AnimatedHeader'
import StickySearchBar from './StickySearchBar'
import CustomText from '@components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { Fonts } from '@utils/Constants'
import ContentContainer from '@components/dashBoard/ContentContainer'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons'

const NOTICE_HEIGHT = -(NoticeHeight + 12)

const ProductDashboard: FC = () => {
    const { user } = useAuthStore()

    const { scrollY, expand } = useCollapsibleContext()

    const previousScroll = useRef<number>(0)

    const backToTopStyle = useAnimatedStyle(() => {
        const isScrollingUp = scrollY.value < previousScroll.current && scrollY.value > 180

        const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 })
        const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 })

        previousScroll.current = scrollY.value
        return {
            opacity,
            transform: [{ translateY }]
        }
    })
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
                <Animated.View style={[styles.backToTop, backToTopStyle]}>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                        onPress={() => {
                            scrollY.value = 0
                            expand()
                        }}
                    >
                        <Icon name='arrow-up-circle-outline' color='white' size={RFValue(12)} />
                        <CustomText varient='h9' style={{ color: "white" }} fontFamily={Fonts.SemiBold}>
                            Back to top
                        </CustomText>
                    </TouchableOpacity>
                </Animated.View>

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
                            <StickySearchBar />
                        </CollapsibleHeaderContainer>

                        {/* Scrollable Content */}

                        <CollapsibleScrollView nestedScrollEnabled style={styles.panelContainer} showsVerticalScrollIndicator={false}>
                            <ContentContainer />

                            <View style={{ backgroundColor: "#F8F8F8", padding: 20 }}>
                                <CustomText
                                    fontSize={RFValue(32)}
                                    fontFamily={Fonts.Bold}
                                    style={{ opacity: 0.2 }}
                                >
                                    India's last minute app
                                </CustomText>

                                <CustomText
                                    fontFamily={Fonts.Bold}
                                    style={{ marginTop: 10, paddingBottom: 100, opacity: 0.2 }}
                                >
                                    Developed By Aakash
                                </CustomText>
                            </View>

                        </CollapsibleScrollView>

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
    },
    backToTop: {
        position: 'absolute',
        alignSelf: "center",
        top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'black',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        zIndex: 999
    }
})
// export default ProductDashboard


// to use collapsable container e need to wrap inside withCollapsable context
export default withCollapsibleContext(ProductDashboard)