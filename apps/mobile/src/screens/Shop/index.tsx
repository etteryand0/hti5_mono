import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import Typography from '../../components/Typography'
import { api } from '../../providers/trpc'
import type { StackScreenProps } from '../../navigation/RootStack'
import { Divider, List, ListItem } from '@ui-kitten/components'

const Shop = ({ route: { params: { id } } }: StackScreenProps<"Shop">) => {
    const { data, isLoading } = api.store.findUnique.useQuery({ id })
    const { data: products } = api.products.manyFromStore.useQuery({ storeId: id })
    const { data: expiring } = api.purchaseProduct.soonExpiring.useQuery({ storeId: id })

    if (isLoading || !data) {
        return (
            <View style={{
                backgroundColor: '#FBFBFB',
                paddingHorizontal: 20,
                paddingVertical: 40,
                height: '100%'
            }}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <View style={{
            backgroundColor: '#FBFBFB',
            paddingHorizontal: 20,
            paddingVertical: 40,
            height: '100%'
        }}>
            <Typography style={{ marginBottom: 20 }} variant="mobile-medium-title">{data.title}</Typography>
            <Typography style={{ marginBottom: 15 }}>Создатель: {data.owner.name}</Typography>
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
        </View>
    )
}

export default Shop