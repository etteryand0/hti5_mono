/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { forwardRef, useState } from 'react'
import { View, TouchableOpacity, Linking } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import Typography from '../../components/Typography'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import { api } from '../../providers/trpc'

type Props = {
    code: string
    onSave?: (internalName: string) => void
    cancel: () => void
}

const CreateBarcode = forwardRef<BottomSheet, Props>((props, ref) => {
    const [name, setName] = useState("")
    const { mutate } = api.barcode.create.useMutation()

    const save = () => {
        mutate({
            code: props.code,
            internalName: name
        }, {
            onSuccess(data) {
                if (props.onSave) { props.onSave(data.internalName) };
                (ref as any).current.close()
            },
            onError() {
                props.cancel();
                (ref as any).current.close()
            }
        })
    }

    return (
        <BottomSheet
            index={-1}
            ref={ref}
            snapPoints={['35%']}
        >
            <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 40 }}>
                <View style={{ gap: 8 }}>
                    <Typography variant="mobile-medium-subtitle">Введите название продукта для штрих-кода {props.code}</Typography>
                    <TextField
                        onChangeText={setName}
                        placeholder="Введите название продукта"
                        value={name}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL(`https://ru.disai.org/?search_query=${props.code}`).then(() => null).catch(() => null)
                    }}
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 15,
                    }}
                >
                    <Typography color="#407BFF" style={{ textAlign: 'center' }}>Проверить название на открытой базе данных</Typography>
                </TouchableOpacity>
                <Button onPress={save} title="Сохранить штрих код" />
                <TouchableOpacity
                    onPress={() => {
                        props.cancel();
                        (ref as any).current.close()
                    }}
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 15,
                    }}
                >
                    <Typography style={{ textAlign: 'center' }}>Отмена</Typography>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    )
})

CreateBarcode.displayName = 'CreateBarCode'

export default CreateBarcode