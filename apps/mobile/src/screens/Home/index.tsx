import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { api } from '../../providers/trpc'

const Home = () => {
    const { isLoading, data } = api.pingpong.ping.useQuery()
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
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
        backgroundColor: 'white',
        height: '100%',
    }
})
