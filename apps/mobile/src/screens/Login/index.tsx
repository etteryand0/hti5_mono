/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useCallback, useState } from 'react'
import { View, StyleSheet, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useSetAtom } from 'jotai'
import AsyncStorage from '@react-native-async-storage/async-storage'

import type { StackScreenProps } from '../../navigation/RootStack'
import COLORS from '../../theme/colors.json'
import Typography from '../../components/Typography'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import Eye from '../../components/svg/Eye'
import GoBack from '../../components/svg/GoBack'
import { api } from '../../providers/trpc'
import { authTokenAtom } from '../../atoms/authToken'
import { userAtom } from '../../atoms/user'

interface FormData {
    email: string
    password: string
}

const Login = ({ navigation }: StackScreenProps<"Login">) => {
    const { mutate, error, isLoading } = api.auth.login.useMutation()
    const setAuthToken = useSetAtom(authTokenAtom)
    const setUser = useSetAtom(userAtom)
    const { control, handleSubmit } = useForm<FormData>()
    const [passwordHidden, setPasswordHidden] = useState(true)
    const navigateSignup = () => {
        navigation.navigate("Signup")
    }

    const accessoryRight = useCallback(() => (
        <TouchableOpacity
            onPress={() => { setPasswordHidden(v => !v); }}
            style={{
                width: 25,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10
            }}
        >
            <Eye />
        </TouchableOpacity>
    ), [])

    const onSubmit = (formdata: FormData) => {
        console.log(formdata)
        mutate(formdata, {
            onSuccess(data) {
                setAuthToken(data.token)
                setUser(data.user)
                AsyncStorage.setItem('authToken', data.token).finally(() => null)
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Tabs" }]
                })
            },
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={navigation.goBack} style={{ width: 38, height: 38 }}>
                <GoBack />
            </TouchableOpacity>


            <View>
                <Typography style={{ marginBottom: 8 }} variant="mobile-medium-title">Вход</Typography>
                <Typography
                    color={COLORS['text-6']['light-irrelevant']}
                    style={{ marginBottom: 15 }}
                    variant="irrelevant-regular">
                    Введите данные своего аккаунта
                </Typography>


                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.formItem}>
                            <Typography variant="mobile-medium-subtitle">Почта</Typography>
                            <TextField
                                autoCapitalize="none"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                placeholder="Введите свою почту"
                                textContentType="emailAddress"
                                value={value}
                            />
                        </View>
                    )}
                    rules={{ required: true }}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onBlur, onChange, value } }) => (
                        <View style={styles.formItem}>
                            <Typography variant="mobile-medium-subtitle">Пароль</Typography>
                            <TextField
                                accessoryRight={accessoryRight}
                                autoCapitalize="none"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                placeholder="Введите пароль"
                                secureTextEntry={passwordHidden}
                                textContentType="password"
                                value={value}
                            />
                        </View>
                    )}
                    rules={{ required: true }}
                />

                <View style={{ marginTop: 20 }}>
                    <Button onPress={handleSubmit(onSubmit)} title={
                        isLoading ? <ActivityIndicator /> :
                            "Войти"} />
                </View>
                <Typography style={{ marginTop: 15 }}>{error ? 'Попробуйте снова' : null} </Typography>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom: 100,
                }}>
                    <Typography color={COLORS['text-7']['dark-irrelevant']} variant="irrelevant-medium">
                        Нет аккаунта?
                    </Typography>
                    <Pressable onPress={navigateSignup} style={{ paddingVertical: 5 }}>
                        <Typography color="#407BFF" variant="irrelevant-medium">{' '}Зарегистрируйтесь</Typography>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 40,
        justifyContent: 'space-between',
    },
    formItem: {
        gap: 10,
        marginVertical: 5,
    }
})
