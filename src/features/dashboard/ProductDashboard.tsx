import { View, Animated as RNAnimated, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useAuthStore } from '@state/authStore'
import NoticeAnimation from './NoticeAnimation'
import { NoticeHeight } from '@utils/Scaling'
import Visuals from './Visuals'
import { CollapsibleContainer, CollapsibleHeaderContainer, CollapsibleScrollView, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import AnimatedHeader from './AnimatedHeader'
import StickySearchBar from './StickySearchBar'
import CustomText from '@components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { Fonts } from '@utils/Constants'

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
                            <StickySearchBar />
                        </CollapsibleHeaderContainer>


                        {/* Scrollable Content */}

                        <CollapsibleScrollView nestedScrollEnabled style={styles.panelContainer} showsVerticalScrollIndicator={false}>

                            {/* <ContentContainer /> */}

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
    }
})
// export default ProductDashboard


// to use collapsable container e need to wrap inside withCollapsable context
export default withCollapsibleContext(ProductDashboard)