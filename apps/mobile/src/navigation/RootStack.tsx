import React from 'react'
import type { StackScreenProps as SSP } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack'
import Start from '../screens/Start'
import Login from '../screens/Login';
import Sighnup from '../screens/Signup';

type RootStackParamList = {
    Start: { userId: string }
    Login: undefined
    Signup: undefined
}

export type StackScreenProps<T extends keyof RootStackParamList> = SSP<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>()

const RootStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={Start} name="Start" />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen component={Login} name="Login" />
                <Stack.Screen component={Sighnup} name="Signup" />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default RootStackNavigator
