
// Find -> find the object and return object
// FindIndex -> find the object index from array , and return it's index 

import { create } from 'zustand'

import { createJSONStorage, persist } from 'zustand/middleware'
import { mmkvstorage } from './storage'

// interface
// create state like rect useState -> setter function and getter valriable 
interface CartItem {
    _id: string | number
    item: any
    count: number
}

interface CartStore {
    cart: CartItem[],
    addItem: (item: any) => void
    removeItem: (id: string | number) => void
    clearCart: () => void
    getItemCount: (id: string | number) => number
    getTotalprice: () => number
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            addItem: (item) => {
                // get curerent existing cart inside cart array
                const currentCart = get().cart
                // check is item is exist inside currentCart or not 
                const existingItemIndex = currentCart.findIndex(cartItem => cartItem?._id === item?._id)

                // When Item Exist
                if (existingItemIndex >= 0) {
                    // Create Shallow Copy
                    const updatedCart = [...currentCart]
                    updatedCart[existingItemIndex] = {
                        ...updatedCart[existingItemIndex],
                        // Increase count 
                        count: updatedCart[existingItemIndex].count + 1
                    }
                    // setter function
                    set({ cart: updatedCart })
                }
                // When item not exist
                else {
                    set({ cart: [...currentCart, { _id: item._id, item: item, count: 1 }] })
                }
            },

            clearCart: () => set({ cart: [] }),

            removeItem: (id) => {
                // First check is item exist or not 
                // This is getter function
                const currentCart = get().cart
                // check is item is exist inside currentCart or not 

                const existingItemIndex = currentCart.findIndex(cartItem => cartItem?._id === id)

                if (existingItemIndex >= 0) {
                    // Create Shallow Copy
                    const updatedCart = [...currentCart]

                    // get existing item in which i want to remove the count if its count > 0 otherwise remove from whole cart 
                    const existingItem = updatedCart[existingItemIndex]

                    if (existingItem.count > 1) {
                        updatedCart[existingItemIndex] = {
                            ...existingItem,
                            count: existingItem?.count - 1
                        }
                    }
                    else {
                        // remove from cart
                        updatedCart.splice(existingItemIndex, 1)
                    }
                    set({ cart: updatedCart })
                }
            },
            getItemCount: (id) => {
                const currentItem = get().cart.find(cartItem => cartItem._id === id)
                return currentItem ? currentItem?.count : 0
            },
            getTotalprice: () => {
                return get().cart.reduce((total, cartItem) => total + cartItem.item.price * cartItem.count, 0)
            }
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => mmkvstorage)
        }
    )
)



