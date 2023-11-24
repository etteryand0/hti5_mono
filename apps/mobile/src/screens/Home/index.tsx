import React from 'react'
import { View, ActivityIndicator, StatusBar } from 'react-native'
import { api } from '../../providers/trpc'
import Typography from '../../components/Typography'
import { List, ListItem } from '@ui-kitten/components'
import type { TabScreenProps } from '../../navigation/RootStack'

const Home = ({ navigation }: TabScreenProps<"Home">) => {
    const { isLoading, data } = api.store.list.useQuery()

    return (
        <View style={{
            backgroundColor: '#FBFBFB',
            paddingHorizontal: 20,
            paddingVertical: 40,
            height: '100%'
        }}>
            <StatusBar backgroundColor="#FBFBFB" barStyle="dark-content" />
            <Typography style={{ marginBottom: 20 }} variant="mobile-medium-title">Магазины</Typography>
            {isLoading ? <ActivityIndicator /> : null}

            {data ? (
                <List
                    data={data}
                    renderItem={({ item: { title, town, address, id } }) => (
                        <ListItem
                            description={`${town} - ${address}`}
                            onPress={() => { navigation.navigate('Shop', { id }); }}
                            title={title}
                        />
                    )}
                />
            ) : null}
        </View>
    )
}

export default Home