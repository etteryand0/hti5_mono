import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import type { StackScreenProps } from '../../navigation/RootStack'
import { api } from '../../providers/trpc'
import Typography from '../../components/Typography'
import Button from '../../components/Button'

const MyShop = ({ route: { params: { id } } }: StackScreenProps<"MyShop">) => {
    const { data, isLoading } = api.store.findUnique.useQuery({ id })

    if (isLoading || !data) return <ActivityIndicator />

    return (
        <View style={styles.container}>
            <Typography variant="mobile-medium-title">{data.title}</Typography>
            <Button title="Принять незапланированную поставку" />
            <Button title="Запланировать поставку" />
            <Button title="Корректировать список продуктов" />
        </View>
    )
}

export default MyShop

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FBFBFB',
        paddingHorizontal: 20,
        paddingVertical: 40,
        height: '100%'
    },
})
