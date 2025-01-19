import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { adData, categories } from '@utils/dummyData'
import AddCarousal from './AddCarousal'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CategoryContainer from './CategoryContainer'

const ContentContainer = () => {
    return (
        <View style={styles.container}>
            <AddCarousal adData={adData} />


            <CustomText varient='h5' fontFamily={Fonts.SemiBold}>
                Grocery and Kitchen
            </CustomText>

            <CategoryContainer data={categories} />


            <CustomText varient='h5' fontFamily={Fonts.SemiBold}>
                Best Sellers
            </CustomText>

            <CategoryContainer data={categories} />


            <CustomText varient='h5' fontFamily={Fonts.SemiBold}>
                Snaks & Drinks
            </CustomText>

            <CategoryContainer data={categories} />



            <CustomText varient='h5' fontFamily={Fonts.SemiBold}>
               Home & Lifestyle
            </CustomText>

            <CategoryContainer data={categories} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        // backgroundColor:"green"
    }
})
export default ContentContainer