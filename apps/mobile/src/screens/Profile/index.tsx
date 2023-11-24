
import React from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Typography from '../../components/Typography'
import type { TabScreenProps } from '../../navigation/RootStack'
import { useAtom, useSetAtom } from 'jotai'
import { userAtom } from '../../atoms/user'
import { authTokenAtom } from '../../atoms/authToken'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({ navigation }: TabScreenProps<"Profile">) => {
    const [user, setUser] = useAtom(userAtom)
    const setAuthToken = useSetAtom(authTokenAtom)

    const logout = () => {
        Alert.alert("Вы уверены?", "Продолжая, вы выйдите из своего аккаунта", [
            {
                text: "Выйти из аккаунта",
                onPress: () => {
                    AsyncStorage.multiRemove(["authToken", "user"]).then(() => {
                        setUser(null)
                        setAuthToken(null)
                        navigation.reset({
                            index: 0,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                            routes: [{ name: 'Start' as any }]
                        })
                    }).catch(() => null)
                },
                style: "destructive"
            },
            {
                text: "Остаться",
                isPreferred: true,
                style: "cancel"
            }
        ], { cancelable: true })
    }

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', }}>
                    <Typography variant="mobile-medium-title">Привет,{' '}</Typography>
                    <TouchableOpacity>
                        <Typography color="#407BFF" variant="mobile-medium-title">{user?.name.split(" ")[0]}</Typography>
                    </TouchableOpacity>
                </View>
                <Typography color="#A4ACB7">Удачных покупок!</Typography>
            </View>

            <View style={{ marginTop: 60 }}>
                <TouchableOpacity onPress={() => { navigation.navigate("MyShops", {}); }} style={styles.section}>
                    <Typography style={styles.text}>Мои магазины</Typography>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={logout} style={[styles.section, { marginTop: 8 }]}>
                <Typography style={styles.text}>Выйти из аккаунта</Typography>
            </TouchableOpacity>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FBFBFB',
        paddingHorizontal: 20,
        paddingVertical: 40,
        height: '100%'
    },
    section: {
        borderRadius: 20,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: 'center',
        elevation: 2
    },
    text: {
        fontFamily: 'Onest-Regular',
        fontSize: 16,
    }
})
