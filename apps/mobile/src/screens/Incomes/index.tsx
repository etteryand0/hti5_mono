import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { api } from '../../providers/trpc'
import Typography from '../../components/Typography'
import type { I18nConfig } from '@ui-kitten/components';
import { List, ListItem, NativeDateService } from '@ui-kitten/components'


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

const Incomes = () => {
    const { data, isLoading } = api.purchaseBatch.myPlannedBatches.useQuery()
    return (
        <View style={{
            backgroundColor: '#FBFBFB',
            paddingHorizontal: 20,
            paddingVertical: 40,
            height: '100%'
        }}>
            <Typography style={{ marginBottom: 20 }} variant="mobile-medium-title">Запланированные поставки</Typography>
            {isLoading ? <ActivityIndicator /> : null}
            {!isLoading && !data ? <Typography>Нет таких</Typography> : null}
            {data ? (
                <List
                    data={data}
                    renderItem={({ item }) =>
                        <ListItem
                            title={localeDateService.format(item.dealAt, 'DD.MM.YYYY')}
                        />}
                />
            ) : null}
        </View>
    )
}

export default Incomes
