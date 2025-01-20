import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@components/ui/CustomHeader'
import { Colors } from '@utils/Constants'
import SideBar from './SideBar'
import { getAllCategories, getProductByCategories } from '@service/productService'
import ProductList from './ProductList'
import WithCartHOC from '@features/cart/WithCartHOC'

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

    const fetchProducts = async (categoryId: string) => {
        try {
            setProductsLoading(true)
            const data = await getProductByCategories(categoryId)
            setProducts(data)
        } catch (error) {
            console.log("Error Fetching Products : ", error)
        } finally {
            setProductsLoading(false)

        }
    }

    useEffect(() => {
        if (selectedCategory?._id) {
            fetchProducts(selectedCategory?._id)
        }
    }, [selectedCategory])

    return (
        <View style={styles.mainContainer}>
            <CustomHeader title={selectedCategory?.name || "Categories"} search={true} />
            <View style={styles.contentContainer}>
                {categoryLoading ? (
                    <ActivityIndicator size="small" color={Colors.border} />
                ) : (
                    <SideBar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryPress={(category: any) => setSelectedCategory(category)}
                    />
                )}
                <View style={styles.productListContainer}>
                    {productsLoading ? (
                        <ActivityIndicator size="large" color={Colors.border} style={styles.center} />
                    ) : (
                        <ProductList data={products || []} />
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    contentContainer: {
        flex: 1,
        flexDirection: "row",
    },
    sideBar: {
        width: '24%',
        backgroundColor: "white"
    },
    productListContainer: {
        flex: 1,
        padding: 10,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default WithCartHOC(ProductCategories)