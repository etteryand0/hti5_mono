
import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, StatusBar, Alert } from 'react-native'
import { useCameraDevice, Camera, useCodeScanner, useCameraPermission } from 'react-native-vision-camera'
import type BottomSheet from '@gorhom/bottom-sheet'
import NoCameraDeviceError from './NoCameraDeviceError'
import type { StackScreenProps } from '../../navigation/RootStack'
import { Path, Svg } from 'react-native-svg'
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, withSequence } from 'react-native-reanimated'
import Typography from '../Typography'
import { api } from '../../providers/trpc'
import CreateBarcode from '../../screens/CreateUnplannedIncome/CreateBarcode'

const BarCodeScanner = ({ navigation, route: { params: { saveResult } } }: StackScreenProps<"BarCodeScanner">) => {
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back')
    const progress = useSharedValue(0)
    const [code, setCode] = useState<string>("")
    const { mutate: mutateBarcodeSearch } = api.barcode.findUnique.useMutation()
    const bottomSheetRef = useRef<BottomSheet>(null);

    React.useEffect(() => {
        const perm = async () => {
            if (!hasPermission) {
                if (!await requestPermission()) {
                    Alert.alert(
                        "Разрешения на использование камеры",
                        "Пожалуйста, предоставьте разрешения на использование камеры для сканирования штрих-кода",
                    )
                    return false
                }
            }
        }

        perm().then(() => null).catch(() => null)
    }, [])



    const codeScanner = useCodeScanner({
        codeTypes: ['ean-13', 'itf'],
        onCodeScanned: (codes) => {
            if (codes[0]?.value && code === "") {
                setCode(codes[0]?.value)
                mutateBarcodeSearch(codes[0]?.value, {
                    onSuccess(data) {
                        if (data === null) {
                            bottomSheetRef.current?.expand()
                        } else {
                            saveResult(data.code, data.internalName)
                            navigation.goBack()
                        }
                    }
                })
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
                isActive={code === ""}
                style={StyleSheet.absoluteFill}
            />
            <CreateBarcode
                cancel={() => { setCode(""); }}
                code={code}
                onSave={(internalName) => {
                    saveResult(code, internalName)
                    navigation.goBack()
                }}
                ref={bottomSheetRef}
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
