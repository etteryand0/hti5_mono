import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text>Profile screen</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
    }
})
