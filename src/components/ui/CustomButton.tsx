import { Colors, Fonts } from "@utils/Constants";
import { FC } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";

interface CustomButtonProps {
    // function which is of non return type
    onPress: () => void;
    title: string;
    disabled: boolean;
    loading: boolean;
}

const CustomButoon: FC<CustomButtonProps> = ({
    onPress,
    title,
    disabled,
    loading
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            // touch krne pr uski opacity kitna hoga 
            activeOpacity={0.8}

            style={[styles.btn, {
                backgroundColor: disabled ? Colors.disabled : Colors.secondary
            }]}
        >
            {
                loading ?
                    <ActivityIndicator color='white' size='small' />
                    :
                    <CustomText
                        varient="h5"
                        style={styles.text}
                        fontFamily={Fonts.SemiBold}
                    >
                        {title}
                    </CustomText>
            }
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginVertical: 15,
        width: "100%"
    },
    text: {
        color: "#fff"
    }
})

export default CustomButoon