
import React, { useEffect } from 'react'
import { View, StyleSheet, StatusBar, Alert } from 'react-native'
import { useCameraDevice, Camera, useCodeScanner } from 'react-native-vision-camera'
import NoCameraDeviceError from './NoCameraDeviceError'
import type { StackScreenProps } from '../../navigation/RootStack'
import { Path, Svg } from 'react-native-svg'
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, withSequence } from 'react-native-reanimated'
import Typography from '../Typography'

const BarCodeScanner = ({ navigation }: StackScreenProps<"BarCodeScanner">) => {
    const device = useCameraDevice('back')
    const progress = useSharedValue(0)
    const codeScanner = useCodeScanner({
        codeTypes: ['ean-13', 'itf'],
        onCodeScanned: (codes) => {
            if (codes[0]?.value) {
                Alert.alert("Штрих-код =", codes[0].value)
                navigation.navigate('Tabs', { screen: 'Home', params: { code: codes[0].value } })
            }
        },
    })

    useEffect(() => {
        progress.value = withRepeat(withSequence(
            withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
            withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.quad) })
        ), -1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            top: progress.value * 156,
        }
    }, [progress])

    if (!device) {
        return <NoCameraDeviceError />
    }

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Typography style={styles.infotext} variant="mobile-medium-subtitle">Поместите штрих код в эту область</Typography>
            </View>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View
                style={{
                    zIndex: 10,
                    alignSelf: 'center',
                    position: 'relative',
                }}
            >
                <Animated.View style={[styles.bar, animatedStyle]} />
                <Svg
                    fill="none"
                    height={156}
                    width={257}
                >
                    <Path
                        d="M23.08 3H4a1 1 0 0 0-1 1v11M23.08 153H4a1 1 0 0 1-1-1v-11M233.92 3H253a1 1 0 0 1 1 1v11M233.92 153H253a1 1 0 0 0 1-1v-11"
                        stroke="#407BFF"
                        strokeLinecap="round"
                        strokeWidth={5}
                    />
                </Svg>
            </View>
            <Camera
                codeScanner={codeScanner}
                device={device}
                isActive
                style={StyleSheet.absoluteFill}
            />
        </View>
    )
}

export default BarCodeScanner

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
    },
    bar: {
        width: 257 + 40,
        left: -20,
        height: 3,
        borderRadius: 100,
        position: 'absolute',
        backgroundColor: '#407BFF'
    },
    info: {
        position: 'absolute',
        top: 0,
        zIndex: 10,
        height: 60,
        width: '100%',
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
    },
    infotext: {
        textAlign: 'center'
    }
})
