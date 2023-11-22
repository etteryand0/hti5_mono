import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStackNavigator from '../navigation/RootStack'


const NavigationProvider = () => {
    return (
        <NavigationContainer>
            <RootStackNavigator />
        </NavigationContainer>
    )
}

export default NavigationProvider
