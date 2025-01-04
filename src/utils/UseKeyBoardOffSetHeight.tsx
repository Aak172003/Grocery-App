import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function useKeyBoardOffSetHeight() {
    const [keyBoardOffSetHeight, setKeyBoardOffSetHeight] = useState(0)



    useEffect(() => {


        // For Keyboard 
        const keyBoardWillAndroidShowListner =
            Keyboard.addListener(
                'keyboardDidShow',
                e => { setKeyBoardOffSetHeight(e.endCoordinates.height) }
            )


        const keyBoardWillAndroidHideListner =
            Keyboard.addListener(
                'keyboardDidHide',
                e => { setKeyBoardOffSetHeight(0) }
            )



        // For ios
        const keyBoardWillShowListner =
            Keyboard.addListener(
                'keyboardWillShow',
                e => { setKeyBoardOffSetHeight(e.endCoordinates.height) }
            )


        const keyBoardWillHideListner =
            Keyboard.addListener(
                'keyboardWillHide',
                e => { setKeyBoardOffSetHeight(e.endCoordinates.height) }
            )


        // All four are registered

        return () => {
            keyBoardWillAndroidShowListner.remove()
            keyBoardWillAndroidHideListner.remove()
            keyBoardWillShowListner.remove()
            keyBoardWillHideListner.remove()
        }
    }, [])

    return keyBoardOffSetHeight
}