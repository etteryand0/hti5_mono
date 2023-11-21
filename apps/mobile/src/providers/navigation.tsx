import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator()

const NavigationProvider = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen component={Home} name="Home" />
                <Tab.Screen component={Profile} name="Profile" />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default NavigationProvider
