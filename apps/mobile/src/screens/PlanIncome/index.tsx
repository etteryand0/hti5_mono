/* eslint-disable @typescript-eslint/no-misused-promises */

import { View, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import BottomSheet from '@gorhom/bottom-sheet';
import { api } from '../../providers/trpc'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import Typography from '../../components/Typography'
import type { StackScreenProps } from '../../navigation/RootStack'
import type { I18nConfig } from '@ui-kitten/components';
import { Datepicker, NativeDateService } from '@ui-kitten/components'
import CreateBarcode from '../CreateUnplannedIncome/CreateBarcode';

interface FormData {
    barcodeId: string
    count: string
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


const PlanIncome = ({ navigation, route: { params: { storeId } } }: StackScreenProps<"PlanIncome">) => {
    const [batchProducts, setBatchProducts] = useState<{
        barcodeId: string
        count: number
        expirationDate: Date
    }[]>([])
    const [dealAt, setDealAt] = useState(new Date())
    const [name, setName] = useState<string | undefined>()
    const { control, handleSubmit, setValue, getValues, reset } = useForm<FormData>()
    const { isLoading, mutate } = api.purchaseBatch.create.useMutation()
    const { mutate: mutateBarcodeSearch } = api.barcode.findUnique.useMutation()

    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomSheetDateRef = useRef<BottomSheet>(null);

    const onSubmit = () => {
        if (batchProducts.length > 0) {
            mutate({
                batchProducts,
                storeId,
                dealAt,
                complete: false,
            }, {
                onSuccess: () => {
                    navigation.navigate('MyShop', { id: storeId })
                }
            })
        }
    }

    const onBatchProductSubmit = ({ barcodeId, count }: FormData) => {
        setBatchProducts((arr) => {
            return [...arr, {
                barcodeId,
                count: parseInt(count),
                expirationDate: new Date(2100, 10, 10)
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
            <Typography style={{ marginBottom: 20 }} variant="mobile-medium-title">Планировать поставку</Typography>

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

            <BottomSheet
                index={-1}
                ref={bottomSheetDateRef}
                snapPoints={['35%']}
                style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
                <View style={{ gap: 8, marginBottom: 20 }}>
                    <Typography variant="mobile-medium-subtitle">Дата поставки</Typography>
                    <Datepicker
                        controlStyle={{
                            borderRadius: 70,
                            borderWidth: 1.5,
                            borderColor: "#F3F3F5",
                            backgroundColor: 'white'
                        }}
                        date={dealAt}
                        dateService={localeDateService}
                        max={new Date(2040, 12, 12)}
                        min={new Date()}
                        onSelect={setDealAt}
                        placeholder="Укажите дату планируемой поставки"
                    />
                </View>
                <Button onPress={onSubmit} title={isLoading ? <ActivityIndicator /> : "Сохранить"} />
            </BottomSheet>

            <View style={{ marginVertical: 20 }}>
                {batchProducts.map(({ barcodeId, count, }, index) =>
                    <Typography key={`huta-${barcodeId}`}>{index + 1}. {barcodeId}. Кол-во {count}</Typography>
                )}
            </View>
            {batchProducts.length > 0 ? (
                <Button
                    onPress={() => bottomSheetDateRef.current?.expand()}
                    title="Спланировать поставку"
                />
            ) : null}
        </View>
    )
}

export default PlanIncome