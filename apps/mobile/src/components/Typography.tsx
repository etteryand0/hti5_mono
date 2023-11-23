import React from 'react'
import { Text } from 'react-native'
import type { TextProps } from 'react-native'
import TEXT_STYLES from '../theme/textStyles.json'

interface TypographyProps extends TextProps {
    variant?: keyof typeof TEXT_STYLES
    color?: string
}

const Typography = ({ children, color, variant = "irrelevant-regular", ...props }: TypographyProps) => {
    const style = color ? { color } : { color: "#000" }
    return (
        <Text
            {...props}
            style={[TEXT_STYLES[variant], style, props.style]}>
            {children}
        </Text>
    )
}

export default Typography
