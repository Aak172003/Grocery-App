import { MMKV } from 'react-native-mmkv'

// This mmkv is more faster than rest of other state management libraray like RealmeDB , Async Storage 

// This mmkv is fast because this is written using c++
// This perfom synchronously operation 
export const tokenStoage = new MMKV({
    id: "token-storage",
    encryptionKey: "some_secret_key",

})

// Global storage 
export const storage = new MMKV({
    id: "my-app-storage",
    encryptionKey: "some_secret_key",

})

// MMKV Operations
export const mmkvstorage = {

    // Set
    setItem: (key: string, value: string) => {
        storage.set(key, value)
    }
    ,
    getItem: (key: string) => {
        const value = storage.getString(key)
        // return value ? value : null
        // or  
        return value ?? null
    },
    removeItem: (key: string) => {
        storage.delete(key)
    }
}