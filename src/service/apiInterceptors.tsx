import { tokenStorage } from "@state/storage";
import axios from "axios";
import { refresh_token } from "./AuthService";
import { Alert } from "react-native";


export const appAxios = axios.create(
    {
        baseURL: "http://192.168.29.236:8000/api/v1"
    }
)


axios.interceptors.request.use(async config => {

    const accessToken = tokenStorage.getString('accessToken')

    if (accessToken) {
        config.headers.token = `Bearer ${accessToken}`
    }

    console.log("accessToken - axios interceptors -------------------- ", accessToken)


    console.log("this is config --------------------- ", config)
    return config
})


// if getting response 
appAxios.interceptors.response.use(
    response => response,
    async error => {
        // get error related to authorization
        if (error.response && error.response.status == 401) {
            try {

                const newAccessToken = await refresh_token()

                if (newAccessToken) {
                    error.config.headers.token = `Bearer ${newAccessToken}`

                    return axios(error.config)
                }
            } catch (error) {
                console.log("Error while refreshing token")
            }
        }

        if (error.response && error.response.status != 401) {
            const errorMessage = error.response.data.message || 'Something Went wrong in axios interceptors'
            Alert.alert(errorMessage)
        }

        return Promise.resolve(error)
    }
)