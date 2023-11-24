import React from 'react'
import { View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import type { StackScreenProps } from '../../navigation/RootStack'
import { api } from '../../providers/trpc'
import Typography from '../../components/Typography'
import { Divider, List, ListItem } from '@ui-kitten/components'

const MyShop = ({ route: { params: { id } }, navigation }: StackScreenProps<"MyShop">) => {
    const { data, isLoading, } = api.store.findUnique.useQuery({ id })
    const { data: products } = api.products.manyFromStore.useQuery({ storeId: id })
    const { data: expiring } = api.purchaseProduct.soonExpiring.useQuery({ storeId: id })

    if (isLoading || !data) return <ActivityIndicator />

    const plan = () => {
        navigation.navigate("PlanIncome", { storeId: id })
    }

    return (
        <View style={styles.container}>
            <Typography variant="mobile-medium-title">{data.title}</Typography>

            <Typography variant="mobile-medium-subtitle">Инвентарь</Typography>
            {products ? (
                <List
                    ItemSeparatorComponent={Divider}
                    data={products}
                    renderItem={({ item: { barcode, barcodeId, count } }) =>
                        <ListItem
                            description={`${barcodeId}. Кол-во ${count}`}
                            title={barcode.internalName}
                        />}
                    style={{ height: 250, flexGrow: 0 }}
                />

            ) : <ActivityIndicator />}

            <Typography variant="mobile-medium-subtitle">Скоро выйдут из срока</Typography>
            {products ? (
                <List
                    ItemSeparatorComponent={Divider}
                    data={expiring}
                    renderItem={({ item: { barcodeId, count, barcode } }) =>
                        <ListItem
                            description={`${barcodeId}. Кол-во ${count}`}
                            title={barcode.internalName}
                        />}
                    style={{ height: 150, flexGrow: 0 }}
                />

            ) : <ActivityIndicator />}

            <TouchableOpacity onPress={() => { navigation.navigate('CreateUnplannedIncome', { storeId: id }); }} style={styles.button}>
                <Typography color="#407BFF" style={{ textAlign: 'center' }}>Принять незапланированную поставку</Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={plan} style={styles.button}>
                <Typography color="#407BFF" style={{ textAlign: 'center' }}>Планировать поставку</Typography>
            </TouchableOpacity>
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
    button: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    }
})
