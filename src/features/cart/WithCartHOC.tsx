import { useCartStore } from "@state/cartStore";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import CartAnnimationWrapper from "./CartAnnimationWrapper";

import defaultImage from '@assets/products/10.png'
import CartSummary from "./CartSummary";

const WithCartHOC = <P extends object>(WrappedComponent: React.ComponentType<P>): FC<P> => {

    const WithCartComponent: FC<P> = (props) => {
        const cart = useCartStore(state => state.cart)

        const cartCount = cart.reduce((acc, item) => acc + item.count, 0)
        return (
            <View style={styles.container}>
                <WrappedComponent  {...props} />


                <CartAnnimationWrapper cartCount={cartCount}>
                    <CartSummary
                        cartCount={cartCount}
                        cartImage={cart![0]?.item?.image || defaultImage}

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


