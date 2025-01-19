import axios from "axios"

export const getAllCategories = async () => {
    try {
        const { data } = await axios.get(`http://192.168.29.236:8000/api/v1/category`)
        console.log("this is data ---- after fecthing categories ---------- ", data)
        return data
    } catch (error) {
        console.log("after fecthing categories ", error)

    }
}

export const getProductByCategories = async (id: string) => {
    try {
        const { data } = await axios.get(`http://192.168.29.236:8000/api/v1/product/${id}`)
        console.log("this is data ---- after fecthing product based on categories  ---------- ", data)

        return data
    } catch (error) {
        console.log(" after fecthing product based on categories : ", error)

    }
}