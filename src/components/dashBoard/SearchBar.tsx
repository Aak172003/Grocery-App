import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Fonts } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import RollingBar from 'react-native-rolling-bar'
import CustomText from '@components/ui/CustomText'

const SearchBar: FC = () => {
    return (
        <TouchableOpacity style={styles.conatiner} activeOpacity={0.8}>
            <Icon name='search' color={Colors.text} size={RFValue(20)} />

            <RollingBar interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
                <CustomText varient='h6' fontFamily={Fonts.Medium} >Aman</CustomText>
                <CustomText varient='h6' fontFamily={Fonts.Medium} >Aakash</CustomText>

                <CustomText varient='h6' fontFamily={Fonts.Medium} >Papa</CustomText>

                <CustomText varient='h6' fontFamily={Fonts.Medium} >Mummy</CustomText>

            </RollingBar>

            <View style={styles.divider} />
            <Icon name='mic' color={Colors.text} size={RFValue(20)} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: "#F3F4F7",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: Colors.border,
        marginTop: 15,
        overflow: 'hidden',
        marginHorizontal: 10,
        paddingHorizontal: 10
    },
    textContainer: {
        width: '90%',
        paddingLeft: 10,
        height: 50
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: "#ddd",
        marginHorizontal: 10
    }
})
export default SearchBar