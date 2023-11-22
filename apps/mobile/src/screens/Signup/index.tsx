import React from 'react'
import { View, StyleSheet } from 'react-native'
import Typography from '../../components/Typography'

const Sighnup = () => {
    return (
        <View style={styles.container}>
            <Typography color="red">Signup screen</Typography>
        </View>
    )
}

export default Sighnup

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    }
})
