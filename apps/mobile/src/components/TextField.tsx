import React from 'react'
import { StyleSheet } from 'react-native'
import { Input, type InputProps } from '@ui-kitten/components'
import COLORS from '../theme/colors.json'
import TEXT_STYLES from '../theme/textStyles.json'

const TextField = (props: InputProps) => {
    return (
        <Input
            placeholderTextColor={COLORS['text-6']['light-irrelevant']}
            {...props}
            style={[styles.input, props.style]}
            textStyle={styles.text}
        />
    )
}

export default TextField

const styles = StyleSheet.create({
    input: {
        minHeight: 56,
        borderRadius: 70,
        borderWidth: 1.5,
        borderColor: "#F3F3F5",
        backgroundColor: 'white',
    },
    text: {
        color: '#000',
        ...TEXT_STYLES['irrelevant-regular'],
    }
})
