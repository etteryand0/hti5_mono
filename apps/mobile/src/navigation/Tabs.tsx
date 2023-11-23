import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Incomes from '../screens/Incomes'
import Search from '../screens/Search'
import Cart from '../screens/Cart'

import HomeIcon from '../components/svg/Home'
import UserIcon from '../components/svg/User'
import CartIcon from '../components/svg/Cart'
import SearchIcon from '../components/svg/Search'
import IncomesIcon from '../components/svg/Timeplate'


type BottomTabParamList = {
    Incomes: undefined
    Search: undefined
    Home: undefined
    Cart: undefined
    Profile: undefined
}

const Tab = createBottomTabNavigator<BottomTabParamList>()

const BarIcon = ({ focused, Icon }: { focused: boolean, Icon: typeof HomeIcon }) =>
    <Icon stroke={focused ? "#407BFF" : "#9EA9BC"} />

const IncomesBarIcon = (props: { focused: boolean }) => <BarIcon Icon={IncomesIcon} {...props} />
const SearchBarIcon = (props: { focused: boolean }) => <BarIcon Icon={SearchIcon} {...props} />
const HomeBarIcon = (props: { focused: boolean }) => <BarIcon Icon={HomeIcon} {...props} />
const CartBarIcon = (props: { focused: boolean }) => <BarIcon Icon={CartIcon} {...props} />
const ProfileBarIcon = (props: { focused: boolean }) => <BarIcon Icon={UserIcon} {...props} />

const TabsNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 70,
            },
            tabBarItemStyle: {
            }
        }}>
            <Tab.Screen component={Incomes} name="Incomes" options={{ tabBarIcon: IncomesBarIcon, }} />
            <Tab.Screen component={Search} name="Search" options={{ tabBarIcon: SearchBarIcon, }} />
            <Tab.Screen component={Home} name="Home" options={{ tabBarIcon: HomeBarIcon, }} />
            <Tab.Screen component={Cart} name="Cart" options={{ tabBarIcon: CartBarIcon, }} />
            <Tab.Screen component={Profile} name="Profile" options={{ tabBarIcon: ProfileBarIcon, }} />
        </Tab.Navigator>
    )
}

export default TabsNavigator
