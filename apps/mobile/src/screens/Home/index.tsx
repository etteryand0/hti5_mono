import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { api } from '../../providers/trpc'

const Home = () => {
    const { isLoading, data } = api.pingpong.ping.useQuery()
    return (
        <View style={styles.container}>
            <Text>Home screen</Text>
            <Text>
                {isLoading ? "loading" : JSON.stringify(data)}
            </Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
    }
})
