import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@components/ui/CustomHeader'
import { Colors } from '@utils/Constants'
import SideBar from './SideBar'
import { getAllCategories } from '@service/productService'

const ProductCategories = ({ route }: any) => {
    const { params } = route;
    // const { id, name, image } = params;


    const [categories, setCategories] = useState<any[]>([])
    const [selectedCategory, setSelectedCategory] = useState<any>(params || null)
    const [products, setProducts] = useState<any[]>([])
    const [categoryLoading, setCategoryLoading] = useState<boolean>(true)
    const [productsLoading, setProductsLoading] = useState<boolean>(false)

    const fetchCategories = async () => {
        try {
            setCategoryLoading(true)
            const data = await getAllCategories()

            setCategories(data)

        } catch (error) {
            console.log("error : ", error)
        } finally {
            setCategoryLoading(false)

        }
    }


    useEffect(() => {
        fetchCategories()
    }, [])




    return (
        <View style={styles.mainContainer}>

            <CustomHeader title={selectedCategory?.name || "Categories"} search={true} />
            <View>

                {categoryLoading ? (<ActivityIndicator size='small' color={Colors.border} />) : (
                    <SideBar

                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryPress={(category: any) => setSelectedCategory(category)}

                    />
                )}
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    subContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    }
})
export default ProductCategories