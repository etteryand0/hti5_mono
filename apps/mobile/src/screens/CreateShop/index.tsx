/* eslint-disable @typescript-eslint/no-misused-promises */
import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { api } from '../../providers/trpc'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import Typography from '../../components/Typography'
import type { StackScreenProps } from '../../navigation/RootStack'

interface FormData {
    title: string
    address: string
    town: string
}

const CreateShop = ({ navigation }: StackScreenProps<"CreateShop">) => {
    const { control, handleSubmit } = useForm<FormData>()
    const { isLoading, mutate } = api.store.create.useMutation()

    const onSubmit = (formdata: FormData) => {
        mutate({
            ...formdata,
            store_type: "Grocery",
        }, {
            onSuccess: () => {
                navigation.navigate('MyShops', { refetch: true })
            }
        })
    }

    return (
        <View style={{
            backgroundColor: '#FBFBFB',
            paddingHorizontal: 20,
            paddingVertical: 40,
            height: '100%'
        }}>
            <Typography style={{ marginBottom: 20 }} variant="mobile-medium-title">Создать магазин</Typography>

            <Controller
                control={control}
                name="title"
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={{ gap: 8 }}>
                        <Typography variant="mobile-medium-subtitle">Название</Typography>
                        <TextField
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder="Введите название магазина"
                            value={value}
                        />
                    </View>
                )}
                rules={{ required: true }}
            />

            <Controller
                control={control}
                name="town"
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={{ gap: 8 }}>
                        <Typography variant="mobile-medium-subtitle">Населенный пункт</Typography>
                        <TextField
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder="Введите населенный пункт"
                            value={value}
                        />
                    </View>
                )}
                rules={{ required: true }}
            />

            <Controller
                control={control}
                name="address"
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={{ gap: 8 }}>
                        <Typography variant="mobile-medium-subtitle">Адрес</Typography>
                        <TextField
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder="Введите адрес"
                            value={value}
                        />
                    </View>
                )}
                rules={{ required: true }}
            />

            <Button
                onPress={handleSubmit(onSubmit)}
                title={!isLoading ? "Создать магазин" : <ActivityIndicator />}
            />
        </View>
    )
}

export default CreateShop