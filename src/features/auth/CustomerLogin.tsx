import { Image, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import logo from '../../assets/images/logo.png';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import { TEXT_APP_SLOGAN } from '../../../text';

const CustomerLogin = () => {

    const [phoneNumber, setPhoneNumber] = useState("")
    const [loading, setLoading] = useState(false)

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <CustomSafeAreaView>
                    <ProductSlider />

                    <View style={styles.content}>
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
                    </View>
                </CustomSafeAreaView>
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
        // justifyContent: 'center', // Vertically center
        alignItems: 'center', // Horizontally center
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 20
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
    }
});

export default CustomerLogin;
