import React from 'react'
import { View, StyleSheet } from 'react-native'
import Typography from '../Typography'

const NoCameraDeviceError = () => {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Typography style={styles.title} variant="mobile-medium-title">Нет доступа к камере</Typography>
                <Typography>
                    Пожалуйста, перейдите в настройки и предоставьте нашему приложению
                    разрешение на использованеие камеры. Эта функция требуется для сканирования штрих-кодов на упаковках
                    продуктов.
                </Typography>
            </View>
        </View>
    )
}

export default NoCameraDeviceError

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        width: '80%',
        minHeight: 300,
        borderRadius: 70,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    title: {
        textAlign: 'center',
    }
})