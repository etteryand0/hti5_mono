import React from 'react'
import { View, Image, StyleSheet, Dimensions, StatusBar } from 'react-native'

import Button from '../../components/Button'
import Typography from '../../components/Typography'

import ILLUSTRATION_SOURCE from '../../../assets/images/start.png'
import Logo from '../../components/svg/Logo'
import LogoTitle from '../../components/svg/LogoTitle'
import type { StackScreenProps } from '../../navigation/RootStack'

const { width } = Dimensions.get('screen')

const Start = ({ navigation }: StackScreenProps<"Start">) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <Image source={ILLUSTRATION_SOURCE} style={styles.illustration} />
            <View style={styles.infoblock}>
                <View style={styles.logo}>
                    <Logo />
                    <LogoTitle />
                </View>
                <Typography color="#000" variant="mobile-medium-title">
                    Следи за поставками продуктов в свой любимый магазин
                </Typography>
                <Typography color="#A4ACB7" variant="irrelevant-regular">
                    Теперь поход в магазин стал еще легче.{'\n'}Вся информация о поставках продуктов в одном приложении!
                </Typography>
            </View>
            <View style={styles.actions}>
                <Button onPress={() => { navigation.navigate('Login') }} title="Войти" variant="fill" />
                <Button onPress={() => { navigation.navigate('Signup') }} title="Зарегистрироваться" variant="outline" />
            </View>
        </View >
    )
}

export default Start

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        paddingVertical: 40,
        height: '100%',
        justifyContent: 'flex-end',
    },
    actions: {
        gap: 20,
        marginTop: 21,
    },
    illustration: {
        width: width - 40,
        height: (width - 40) * (208 / 320),
        resizeMode: 'contain',
        marginBottom: 65,
    },
    infoblock: {
        gap: 20,
    },
    logo: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    }
})
