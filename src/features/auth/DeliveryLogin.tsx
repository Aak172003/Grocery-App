import { View, Text, Alert, Keyboard, StyleSheet, ScrollView } from 'react-native'
import React, { FC, useState } from 'react'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { DeliveryPartnerLogin } from '@service/AuthService'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import { screenHeight } from '@utils/Scaling'

import LottieView from 'lottie-react-native'
import deliveryLoginAnnimations from '@assets/animations/delivery_man.json'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CustomInput from '@components/ui/CustomInput'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomButoon from '@components/ui/CustomButton'

const DeliveryLogin: FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        Keyboard.dismiss()
        setLoading(true)
        try {

            console.log("inside try")
            const data = await DeliveryPartnerLogin(email, password)
            if (data) {
                resetAndNavigate('DeliveryDashboard')
            } else {
                console.log("found error while getting response ")
            }


        } catch (error) {
            Alert.alert("Delivery Login is failed")
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    return (
        <GestureHandlerRootView >
            <CustomSafeAreaView>
                <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode='on-drag'>
                    <View style={styles.container}>
                        <View style={styles.lottieContainer}>
                            <LottieView autoPlay loop style={styles.lottie} source={deliveryLoginAnnimations} />
                        </View>
                        <CustomText varient='h3' fontFamily={Fonts.Bold}>
                            Delivery Partner Portal
                        </CustomText>
                        <CustomText varient='h6' style={styles.text} fontFamily={Fonts.SemiBold}>
                            Faster than Flash ⚡⚡️
                        </CustomText>
                        <CustomInput
                            onChangeText={setEmail}
                            value={email}
                            placeholder='Enter Email'
                            left={
                                <Icon
                                    name='mail'
                                    color='#F8890E'
                                    style={{ marginRight: 12 }}
                                    size={RFValue(18)}
                                />
                            }

                            inputMode='email'
                            right={false}
                        />
                        <CustomInput
                            onChangeText={setPassword}
                            value={password}
                            placeholder='Enter Password'
                            left={
                                <Icon
                                    name='key-sharp'
                                    color='#F8890E'
                                    style={{ marginRight: 12 }}
                                    size={RFValue(18)}
                                />
                            }
                            secureTextEntry={true}
                            right={false}
                        />
                        <CustomButoon
                            disabled={email.length == 0 || password.length < 8}
                            title='Delivery Partner Login'
                            onPress={handleLogin}
                            loading={loading}
                        />
                    </View>
                </ScrollView>
            </CustomSafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
    lottie: {
        height: '100%',
        width: '100%'
    },
    lottieContainer: {
        height: screenHeight * 0.3,
        width: '100%'
    },
    text: {
        opacity: 0.8
    }
})
export default DeliveryLogin