import React from "react"
import type { ViewStyle, TouchableNativeFeedbackProps } from "react-native"
import { TouchableNativeFeedback, View, StyleSheet } from "react-native"
import COLORS from "../theme/colors.json"
import Typography from "./Typography"

interface ButtonProps extends Omit<TouchableNativeFeedbackProps, "children"> {
    title: string | React.ReactNode
    variant?: "fill" | "outline"
    innerStyle?: ViewStyle
}

const Button = ({ variant = "fill", title, innerStyle, ...props }: ButtonProps) => {

    return (
        <View style={styles.wrap}>
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("#394290b5", false)}
                style={{ borderRadius: 70 }}
                {...props}>
                <View style={[styles.inner, styles[variant], innerStyle]}>
                    <Typography color={variant === "outline" ? "#000" : "#F2F2F2"} variant="buttons-base">{title}</Typography>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    wrap: {
        borderRadius: 70,
        overflow: 'hidden'
    },
    inner: {
        borderRadius: 70,
        width: "100%",
        minHeight: 55,
        justifyContent: "center",
        alignItems: "center",
    },
    fill: {
        backgroundColor: COLORS.buttons.base.default,
    },
    outline: {
        backgroundColor: "white",
        borderWidth: 1.5,
        borderColor: "#969696",
    }
})