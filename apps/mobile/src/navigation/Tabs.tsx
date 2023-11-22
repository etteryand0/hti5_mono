import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator()

const TabsNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen component={Home} name="Home" />
            <Tab.Screen component={Profile} name="Profile" />
        </Tab.Navigator>
    )
}

export default TabsNavigator
