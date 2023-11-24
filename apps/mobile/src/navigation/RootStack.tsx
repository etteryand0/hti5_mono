import React, { useEffect } from 'react'
import type { StackScreenProps as SSP } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack'
import Start from '../screens/Start'
import Login from '../screens/Login';
import Sighnup from '../screens/Signup';
import { authTokenAtom } from '../atoms/authToken';
import { useAtom, useSetAtom } from 'jotai';
import type { BottomTabParamList } from './Tabs';
import TabsNavigator from './Tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarCodeScanner from '../components/BarCodeScanner';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import MyShops from '../screens/MyShops';
import MyShop from '../screens/MyShop';
import CreateShop from '../screens/CreateShop';
import { userAtom } from '../atoms/user';
import CreateUnplannedIncome from '../screens/CreateUnplannedIncome';
import PlanIncome from '../screens/PlanIncome';
import Shop from '../screens/Shop';


type RootStackParamList = {
    Start: undefined
    Login: undefined
    Signup: undefined
    Tabs: NavigatorScreenParams<BottomTabParamList>
    BarCodeScanner: { saveResult: (code: string, internalName?: string) => void }
    MyShops: { refetch?: boolean }
    MyShop: { id: number }
    Shop: { id: number }
    CreateShop: undefined
    CreateUnplannedIncome: { storeId: number }
    PlanIncome: { storeId: number }
}

export type StackScreenProps<T extends keyof RootStackParamList> = SSP<RootStackParamList, T>;
export type TabScreenProps<T extends keyof BottomTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    SSP<RootStackParamList>
>

const Stack = createStackNavigator<RootStackParamList>()

const RootStackNavigator = () => {
    const [authToken, setAuthToken] = useAtom(authTokenAtom)
    const setUser = useSetAtom(userAtom)

    useEffect(() => {
        AsyncStorage.getItem('authToken')
            .then((token) => {
                if (!token) {
                    return;
                }
                setAuthToken(token)
            }).catch(() => null)

        AsyncStorage.getItem('user')
            .then((userRaw) => {
                if (!userRaw) {
                    return
                }

                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                setUser(JSON.parse(userRaw))
            }).catch(() => null)
    }, [setAuthToken, setUser])

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {authToken === null ? (
                <Stack.Screen component={Start} name="Start" />
            ) : null}
            <Stack.Screen component={TabsNavigator} name="Tabs" />
            {/* <Stack.Screen  */}
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen component={BarCodeScanner} name="BarCodeScanner" />
                <Stack.Screen component={MyShops} name="MyShops" />
                <Stack.Screen component={MyShop} name="MyShop" />
                <Stack.Screen component={Shop} name="Shop" />
                <Stack.Screen component={CreateUnplannedIncome} name="CreateUnplannedIncome" />
                <Stack.Screen component={PlanIncome} name="PlanIncome" />
                <Stack.Screen component={CreateShop} name="CreateShop" />
                <Stack.Screen component={Login} name="Login" />
                <Stack.Screen component={Sighnup} name="Signup" />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default RootStackNavigator
