import { Alert, Image, Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import logo from '../../assets/images/logo.png';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import { TEXT_APP_SLOGAN } from '../../../text';
import CustomButoon from '@components/ui/CustomButton';
import { RFValue } from 'react-native-responsive-fontsize';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { customerLogin } from '@service/AuthService';

const CustomerLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [loading, setLoading] = useState(false)

    const handleAuth = async () => {
        Keyboard.dismiss()
        setLoading(true)
        try {
            const data = await customerLogin(phoneNumber)
            if (data) {
                resetAndNavigate('ProductDashboard')
            } else {
                console.log("found error while getting response ")
            }
        } catch (error) {
            Alert.alert("Login Failed ")
            setLoading(false)
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <CustomSafeAreaView>
                    <ProductSlider />

                    <View style={styles.content} >
                        <Image source={logo} style={styles.logo} />
                        <CustomText varient='h2' fontFamily={Fonts.Bold}>
                            {TEXT_APP_SLOGAN}
                        </CustomText>
                        <CustomText varient='h5' fontFamily={Fonts.SemiBold} style={styles.text}>
                            Login or SignUp
                        </CustomText>
                        <CustomInput
                            onChangeText={(text) => { setPhoneNumber(text.slice(0, 10)) }}
                            onclear={() => { setPhoneNumber('') }}
                            value={phoneNumber}
                            left={<CustomText style={styles.phoneText}
                                varient='h5'
                                fontFamily={Fonts.SemiBold}
                            >
                                + 91
                            </CustomText>}
                            placeholder='Enter Mobile Number'
                            inputMode='numeric'
                        />
                        <CustomButoon
                            disabled={phoneNumber?.length != 10}
                            onPress={() => handleAuth()}
                            loading={loading}
                            title='Continue' />
                    </View>
                </CustomSafeAreaView>


                <View style={styles.footer}>
                    <SafeAreaView>
                        <CustomText fontSize={RFValue(6)}>By Continuoing , you agree to our Terms of Service & Privacy Policy</CustomText>
                    </SafeAreaView>
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 20,
        marginVertical: 10,
    },
    text: {
        marginTop: 2,
        marginBottom: 25,
        opacity: 0.8
    },
    phoneText: {
        marginLeft: 10,
        marginRight: 10
    },
    footer: {
        borderTopWidth: 0.8,
        borderColor: Colors.border,
        paddingBottom: 10,
        zIndex: 22,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#f8f9fc",
        width: '100%'
    },

});

export default CustomerLogin;
