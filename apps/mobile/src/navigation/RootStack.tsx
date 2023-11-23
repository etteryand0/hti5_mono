import React, { useEffect } from 'react'
import type { StackScreenProps as SSP } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack'
import Start from '../screens/Start'
import Login from '../screens/Login';
import Sighnup from '../screens/Signup';
import { authTokenAtom } from '../atoms/authToken';
import { useAtom } from 'jotai';
import TabsNavigator from './Tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Start: { userId: string }
    Login: undefined
    Signup: undefined
    Tabs: undefined
}

export type StackScreenProps<T extends keyof RootStackParamList> = SSP<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>()

const RootStackNavigator = () => {
    const [authToken, setAuthToken] = useAtom(authTokenAtom)

    useEffect(() => {
        AsyncStorage.getItem('authToken')
            .then((token) => {
                if (!token) {
                    return;
                }
                setAuthToken(token)
            }).catch(() => null)
    }, [setAuthToken])

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {authToken === null ? (
                <Stack.Screen component={Start} name="Start" />
            ) : null}
            <Stack.Screen component={TabsNavigator} name="Tabs" />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen component={Login} name="Login" />
                <Stack.Screen component={Sighnup} name="Signup" />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default RootStackNavigator
