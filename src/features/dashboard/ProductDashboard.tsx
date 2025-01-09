import { View, Text, Animated as RNAnimated, SafeAreaView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useAuthStore } from '@state/authStore'
import NoticeAnimation from './NoticeAnimation'
import { NoticeHeight } from '@utils/Scaling'

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


    // useEffect(() => {
    //     slideDown()

    //     const timeoutId = setTimeout(() => {
    //         slideUp()
    //     }, 3500)

    //     return () => clearTimeout(timeoutId)
    // }, [])

    return (

        // <NoticeAnimation noticePosition={noticePosition} >
        <NoticeAnimation noticePosition={noticePosition} >

            <>


                {/* <SafeAreaView /> */}
                <View style={{ flex: 1 }}>
                </View></>

        </NoticeAnimation>

    )
}

export default ProductDashboard