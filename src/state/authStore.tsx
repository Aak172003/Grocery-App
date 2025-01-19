import { create } from 'zustand'

import { createJSONStorage, persist } from 'zustand/middleware'
import { mmkvstorage } from './storage'

// interface
// create state like rect useState -> setter function and getter valriable 


interface authStore {
    user: Record<string, any> | null
    setUser: (user: any) => void
    setCurrentOrder: (order: any) => void
    currentOrder: Record<string, any> | null
    logout: () => void
}



export const useAuthStore = create<authStore>()(
    persist(
        (set, get) => ({
            user: null,
            currentOrder: null,
            setCurrentOrder: (order) => set({ currentOrder: order }),
            setUser: (data) => set({ user: data }),
            logout: () => set({
                user: null, currentOrder: null
            })
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => mmkvstorage)
        }
    )
)



