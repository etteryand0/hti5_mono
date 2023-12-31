/* eslint-disable @typescript-eslint/no-misused-promises */

import { View, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import type BottomSheet from '@gorhom/bottom-sheet';
import { api } from '../../providers/trpc'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import Typography from '../../components/Typography'
import type { StackScreenProps } from '../../navigation/RootStack'
import type { I18nConfig } from '@ui-kitten/components';
import { Datepicker, NativeDateService } from '@ui-kitten/components'
import CreateBarcode from './CreateBarcode';

interface FormData {
    barcodeId: string
    count: string
    expirationDate: Date
}

const i18n: I18nConfig = {
    dayNames: {
        short: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        long: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    },
    monthNames: {
        short: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        long: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ],
    },
};

const localeDateService = new NativeDateService('ru', { i18n, startDayOfWeek: 1, format: 'DD.MM.YYYY' })


const CreateUnplannedIncome = ({ navigation, route: { params: { storeId } } }: StackScreenProps<"CreateUnplannedIncome">) => {
    const [batchProducts, setBatchProducts] = useState<{
        barcodeId: string
        count: number
        expirationDate: Date
    }[]>([])
    const [name, setName] = useState<string | undefined>()
    const { control, handleSubmit, setValue, getValues, reset } = useForm<FormData>()
    const { isLoading, mutate } = api.purchaseBatch.create.useMutation()
    const { mutate: mutateBarcodeSearch } = api.barcode.findUnique.useMutation()

    const bottomSheetRef = useRef<BottomSheet>(null);

    const onSubmit = () => {
        if (batchProducts.length > 0) {
            mutate({
                batchProducts,
                storeId,
                dealAt: new Date(),
                complete: true
            }, {
                onSuccess: () => {
                    navigation.navigate('MyShop', { id: storeId })
                }
            })
        }
    }

    const onBatchProductSubmit = ({ barcodeId, count, expirationDate }: FormData) => {
        setBatchProducts((arr) => {
            return [...arr, {
                barcodeId,
                count: parseInt(count),
                expirationDate
            }]
        })
        reset()
    }

    return (
        <View style={{
            backgroundColor: '#FBFBFB',
            paddingHorizontal: 20,
            paddingVertical: 40,
            height: '100%'
        }}>
            <Typography style={{ marginBottom: 20 }} variant="mobile-medium-title">Принять незапланированную поставку</Typography>

            <Controller
                control={control}
                name="barcodeId"
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={{ gap: 8 }}>
                        <Typography variant="mobile-medium-subtitle">Штрих-код</Typography>
                        <TextField
                            onBlur={onBlur}
                            onChangeText={onChange}
                            onSubmitEditing={() => {
                                mutateBarcodeSearch(value, {
                                    onSuccess(data) {
                                        if (data === null) {
                                            bottomSheetRef.current?.expand()
                                        } else {
                                            setName(data.internalName)
                                        }
                                    }
                                })
                            }}
                            placeholder="Введите штрих-код"
                            value={value}
                        />
                    </View>
                )}
                rules={{ required: true }}
            />
            {name ? (
                <Typography>Выбран продукт - {name}</Typography>
            ) : null}
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('BarCodeScanner', {
                        saveResult(code, internalName) {
                            setValue("barcodeId", code)
                            setName(internalName)
                        }
                    });
                }}
                style={{
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                }}
            >
                <Typography color="#407BFF" style={{ textAlign: 'center' }}>Или отсканируйте штрих-код</Typography>
            </TouchableOpacity>

            <Controller
                control={control}
                name="count"
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={{ gap: 8 }}>
                        <Typography variant="mobile-medium-subtitle">Количество</Typography>
                        <TextField
                            keyboardType="numeric"
                            onBlur={onBlur}
                            onChangeText={(text) => { onChange(text.replace(/[^0-9]/g, '')); }}
                            placeholder="Укажите количество таких продуктов"
                            value={value}
                        />
                    </View>
                )}
                rules={{ required: true }}
            />

            <Controller
                control={control}
                name="expirationDate"
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={{ gap: 8 }}>
                        <Typography variant="mobile-medium-subtitle">Дата окончания срока годности</Typography>
                        <Datepicker
                            controlStyle={{
                                borderRadius: 70,
                                borderWidth: 1.5,
                                borderColor: "#F3F3F5",
                                backgroundColor: 'white'
                            }}
                            date={value}
                            dateService={localeDateService}
                            max={new Date(2040, 12, 12)}
                            min={new Date()}
                            onBlur={onBlur}
                            onSelect={onChange}
                            placeholder="25.11.2024"
                        />
                    </View>
                )}
                rules={{ required: true }}
            />

            <View style={{ marginTop: 30 }}>
                <Button
                    onPress={handleSubmit(onBatchProductSubmit)}
                    title="Добавить группу продуктов"
                />
            </View>

            <CreateBarcode
                cancel={() => { setValue("barcodeId", ""); }}
                code={getValues().barcodeId}
                ref={bottomSheetRef}
            />

            <View style={{ marginVertical: 20 }}>
                {batchProducts.map(({ barcodeId, count, expirationDate }, index) =>
                    <Typography key={`huta-${barcodeId}`}>{index + 1}. {barcodeId}. Кол-во {count}. Годен до {localeDateService.format(expirationDate, "DD.MM.YYYY")}</Typography>
                )}
            </View>
            {batchProducts.length > 0 ? (
                <Button
                    onPress={onSubmit}
                    title={!isLoading ? "Принять поставку" : <ActivityIndicator />}
                />
            ) : null}
        </View>
    )
}

export default CreateUnplannedIncome