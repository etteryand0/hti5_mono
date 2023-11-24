
import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import type { TabScreenProps } from '../../navigation/RootStack'

const Home = (_props: TabScreenProps<"Home">) => {

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FBFBFB" barStyle="dark-content" />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FBFBFB',
        height: '100%',
    }
})
