/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { View, Text, StyleSheet, StatusBar, Alert } from 'react-native'
import { api } from '../../providers/trpc'
import Button from '../../components/Button'
import { useCameraPermission } from 'react-native-vision-camera'
import type { TabScreenProps } from '../../navigation/RootStack'

const Home = ({ navigation }: TabScreenProps<"Home">) => {
    const { isLoading, data } = api.pingpong.ping.useQuery()
    const { hasPermission, requestPermission } = useCameraPermission()

    const openCamera = async () => {
        if (!hasPermission) {
            if (!await requestPermission()) {
                Alert.alert(
                    "Разрешения на использование камеры",
                    "Пожалуйста, предоставьте разрешения на использование камеры для сканирования штрих-кода",
                )
                return false
            }
        }

        navigation.navigate("BarCodeScanner")
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FBFBFB" barStyle="dark-content" />
            <Text>Home screen</Text>
            <Text>
                {isLoading ? "loading" : JSON.stringify(data)}
            </Text>
            <Button
                onPress={openCamera}
                title="открыть камеру"
            />
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
