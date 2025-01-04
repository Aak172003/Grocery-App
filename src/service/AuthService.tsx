
import axios from 'axios'
import { BASE_URL } from './Config'
import { tokenStorage } from '@state/storage'
import { useAuthStore } from '@state/authStore'
import { resetAndNavigate } from '@utils/NavigationUtils'
export const customerLogin = async (phoneNo: string) => {


    console.log("phoneNo :::::::::::::::::: ", phoneNo)
    try {

        console.log("inside 11111111111111111111111111111111111111111111111111111111")
        const { data } = await axios.post(`http://192.168.29.236:8000/api/v1/customer/login`, { phone: phoneNo })

        console.log("2222222222222222222222222222222222")

        console.log("data ------------------- ", data)

        const { accessToken, refreshToken, customer } = data

        console.log("accessToken ::::::::::::::::::::: ", accessToken)

        console.log("refreshToken : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :  ", refreshToken)
        console.log("customer : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :  ", customer)


        tokenStorage.set("accessToken", accessToken)
        tokenStorage.set("refreshToken", refreshToken)

        const { setUser } = useAuthStore.getState()
        setUser(customer)

        return data

    } catch (error) {
        console.log("Login Error : ", error)
        // clear all keys and values pair
        tokenStorage.clearAll()
        resetAndNavigate("CustomerLogin")
    }
}


// And token refresh tabhi hoga jb accessToken expires ho jae , and if refresh token bhi expires ho jaega then redirect to Customer Login page 
export const refresh_token = async () => {

    try {

        const refreshToken = tokenStorage.getString('refreshToken')

        console.log("this is refreshToken ---------------------------------------- ", refreshToken)

        const { data } = await axios.post(`http://192.168.29.236:8000/api/v1/refreshToken`, { refreshToken })

        console.log("data :::::::::::::: ", data)




        // here jb refreshToken invalid milega then ye error throw krdega , then wo customerLogin page pr rediect krdega 
        const newAccessToken = data?.accessToken
        const newRefreshToken = data?.refreshToken
        const { message } = data



        // tokenStorage.set("accessToken", newAccessToken)
        // tokenStorage.set("refreshToken", newRefreshToken)

        return newAccessToken
    } catch (error) {
        console.log("Error while Refreshing Token : ", error)
    }



}


export const refetchUser = async (setUser: any) => {

    try {

    } catch (error) {
        console.log("Error while Refetching User : ", error)
    }



}