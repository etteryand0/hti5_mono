import { View, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { api } from '../../providers/trpc'
import type { StackScreenProps } from '../../navigation/RootStack'
import Typography from '../../components/Typography'
import Button from '../../components/Button'
import { List, ListItem } from '@ui-kitten/components'

const MyShops = ({ navigation, route: { params } }: StackScreenProps<"MyShops">) => {
    const { data, isLoading, refetch } = api.store.listMine.useQuery()
    const { mutate, isLoading: isLoadingDelete } = api.store.delete.useMutation()

    useEffect(() => {
        if (params?.refetch) {
            refetch().then(() => null).catch(() => null)
        }
    }, [params, refetch])

    const actions = (id: number, title: string) => {
        Alert.alert(title, undefined, [
            {
                text: "Отмена",
                isPreferred: true,
                style: "cancel"
            },
            {
                text: "Удалить",
                style: "destructive",
                onPress: () => {
                    mutate({ id }, {
                        onSuccess() {
                            refetch().then(() => null).catch(() => null)
                        }
                    })
                }

            }
        ], { cancelable: true })
    }

    return (
        <View style={styles.container}>
            <Typography style={{ marginBottom: 20 }} variant="mobile-medium-title">Мои магазины</Typography>
            {isLoading || isLoadingDelete ? <ActivityIndicator /> : null}
            {data ? (
                <List
                    data={data}
                    renderItem={({ item: { id, address, title } }) =>
                        <ListItem
                            onLongPress={() => { actions(id, title); }}
                            onPress={() => { navigation.navigate("MyShop", { id }); }}
                            style={{
                                height: 50,
                                justifyContent: 'center',
                            }}>
                            <Typography>{title} - {address}</Typography>
                        </ListItem>
                    }
                />
            ) : null
            }
            {
                !isLoading ? (
                    <View style={{ marginTop: 20 }}>
                        <Button onPress={() => { navigation.navigate('CreateShop'); }} title="Создать магазин" />
                    </View>
                ) : null
            }
        </View >
    )
}

export default MyShops

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FBFBFB',
        paddingHorizontal: 20,
        paddingVertical: 40,
        height: '100%'
    },
})
