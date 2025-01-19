import axios from "axios"

export const getAllCategories = async () => {
    try {
        const { data } = await axios.get(`http://192.168.29.236:8000/api/v1/category`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getProductByCategories = async (id: string) => {
    try {
        const { data } = await axios.get(`http://192.168.29.236:8000/api/v1/product/${id}`)
        return data
    } catch (error) {
        console.log(error)

    }
}