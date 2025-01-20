import { useCartStore } from "@state/cartStore";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import CartAnnimationWrapper from "./CartAnnimationWrapper";

import CartSummary from "./CartSummary";

const WithCartHOC = <P extends object>(WrappedComponent: React.ComponentType<P>): FC<P> => {

    const WithCartComponent: FC<P> = (props) => {
        const cart = useCartStore(state => state.cart)

        const cartCount = cart.reduce((acc, item) => acc + item.count, 0)

        console.log("cartCountcartCountcartCount : : : :: ", cartCount)
        return (
            <View style={styles.container}>
                <WrappedComponent  {...props} />
                <CartAnnimationWrapper cartCount={cartCount}>

                    {/* Cart Summary Compoenent */}
                    <CartSummary
                        cartCount={cartCount}
                        cartImage={cart![0]?.item?.image || null}
                    />
                </CartAnnimationWrapper>
            </View>
        )

    }


    return WithCartComponent
}


const styles = StyleSheet.create({
    container: {
        flex: 1

    }
})



export default WithCartHOC


