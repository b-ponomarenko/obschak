import getDebtList from '../getDebtList';
import mock from './mock.json';

describe('getDebtList', () => {
    it('Базовый расчет долгов', () => {
        const result1 = getDebtList(mock.base1, 25046098);
        const result2 = getDebtList(mock.base1, 132688541);

        expect(result1).toEqual([{ from: 132688541, to: 25046098, value: 500, currency: 'RUB' }]);
        expect(result2).toEqual([{ from: 132688541, to: 25046098, value: 500, currency: 'RUB' }]);
    });

    it('Базовый расчет. Несколько покупок и несколько пользователей. Покупает один', () => {
        const result1 = getDebtList(mock.base2, 25046098);
        const result2 = getDebtList(mock.base2, 132688541);

        expect(result1).toEqual([
            { from: 132688541, to: 25046098, value: 420, currency: 'RUB' },
            { from: 434266681, to: 25046098, value: 420, currency: 'RUB' },
            { from: 23714559, to: 25046098, value: 420, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 420, currency: 'RUB' },
        ]);
        expect(result2).toEqual([
            { from: 132688541, to: 25046098, value: 420, currency: 'RUB' },
            { from: 434266681, to: 25046098, value: 420, currency: 'RUB' },
            { from: 23714559, to: 25046098, value: 420, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 420, currency: 'RUB' },
        ]);
    });

    it('Несколько покупок и несколько пользователей. Покупают несколько', () => {
        const bogdanResult = getDebtList(mock.purchases1, 25046098);
        const stasResult = getDebtList(mock.purchases1, 68660852);
        const dashaResult = getDebtList(mock.purchases1, 132688541);

        expect(bogdanResult).toEqual([
            { from: 132688541, to: 25046098, value: 300, currency: 'RUB' },
            { from: 434266681, to: 25046098, value: 300, currency: 'RUB' },
            { from: 23714559, to: 25046098, value: 300, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 240, currency: 'RUB' },
            { from: 132688541, to: 68660852, value: 60, currency: 'RUB' },
            { from: 434266681, to: 68660852, value: 60, currency: 'RUB' },
            { from: 23714559, to: 68660852, value: 60, currency: 'RUB' },
        ]);
        expect(stasResult).toEqual([
            { from: 132688541, to: 68660852, value: 60, currency: 'RUB' },
            { from: 434266681, to: 68660852, value: 60, currency: 'RUB' },
            { from: 23714559, to: 68660852, value: 60, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 240, currency: 'RUB' },
            { from: 132688541, to: 25046098, value: 300, currency: 'RUB' },
            { from: 434266681, to: 25046098, value: 300, currency: 'RUB' },
            { from: 23714559, to: 25046098, value: 300, currency: 'RUB' },
        ]);
        expect(dashaResult).toEqual([
            { from: 132688541, to: 25046098, value: 300, currency: 'RUB' },
            { from: 132688541, to: 68660852, value: 60, currency: 'RUB' },
            { from: 434266681, to: 25046098, value: 300, currency: 'RUB' },
            { from: 23714559, to: 25046098, value: 300, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 240, currency: 'RUB' },
            { from: 434266681, to: 68660852, value: 60, currency: 'RUB' },
            { from: 23714559, to: 68660852, value: 60, currency: 'RUB' },
        ]);
    });

    it('Несколько покупок и несколько пользователей. Покупают все', () => {
        const bogdanResult = getDebtList(mock.purchases2, 25046098);
        const stasResult = getDebtList(mock.purchases2, 68660852);
        const dashaResult = getDebtList(mock.purchases2, 132688541);
        const eliseyResult = getDebtList(mock.purchases2, 434266681);
        const iliyaResult = getDebtList(mock.purchases2, 23714559);

        expect(bogdanResult).toEqual([
            { from: 434266681, to: 25046098, value: 200, currency: 'RUB' },
            { from: 23714559, to: 25046098, value: 200, currency: 'RUB' },
            { from: 132688541, to: 25046098, value: 140, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 120, currency: 'RUB' },
            { from: 434266681, to: 68660852, value: 80, currency: 'RUB' },
            { from: 23714559, to: 68660852, value: 80, currency: 'RUB' },
            { from: 434266681, to: 132688541, value: 60, currency: 'RUB' },
            { from: 23714559, to: 132688541, value: 60, currency: 'RUB' },
            { from: 132688541, to: 68660852, value: 20, currency: 'RUB' },
        ]);
        expect(stasResult).toEqual([
            { from: 434266681, to: 68660852, value: 80, currency: 'RUB' },
            { from: 23714559, to: 68660852, value: 80, currency: 'RUB' },
            { from: 132688541, to: 68660852, value: 20, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 120, currency: 'RUB' },
            { from: 434266681, to: 25046098, value: 200, currency: 'RUB' },
            { from: 23714559, to: 25046098, value: 200, currency: 'RUB' },
            { from: 132688541, to: 25046098, value: 140, currency: 'RUB' },
            { from: 434266681, to: 132688541, value: 60, currency: 'RUB' },
            { from: 23714559, to: 132688541, value: 60, currency: 'RUB' },
        ]);
        expect(dashaResult).toEqual([
            { from: 434266681, to: 132688541, value: 60, currency: 'RUB' },
            { from: 23714559, to: 132688541, value: 60, currency: 'RUB' },
            { from: 132688541, to: 25046098, value: 140, currency: 'RUB' },
            { from: 132688541, to: 68660852, value: 20, currency: 'RUB' },
            { from: 434266681, to: 25046098, value: 200, currency: 'RUB' },
            { from: 23714559, to: 25046098, value: 200, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 120, currency: 'RUB' },
            { from: 434266681, to: 68660852, value: 80, currency: 'RUB' },
            { from: 23714559, to: 68660852, value: 80, currency: 'RUB' },
        ]);
        expect(eliseyResult).toEqual([
            { from: 434266681, to: 25046098, value: 200, currency: 'RUB' },
            { from: 434266681, to: 68660852, value: 80, currency: 'RUB' },
            { from: 434266681, to: 132688541, value: 60, currency: 'RUB' },
            { from: 23714559, to: 25046098, value: 200, currency: 'RUB' },
            { from: 132688541, to: 25046098, value: 140, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 120, currency: 'RUB' },
            { from: 23714559, to: 68660852, value: 80, currency: 'RUB' },
            { from: 23714559, to: 132688541, value: 60, currency: 'RUB' },
            { from: 132688541, to: 68660852, value: 20, currency: 'RUB' },
        ]);
        expect(iliyaResult).toEqual([
            { from: 23714559, to: 25046098, value: 200, currency: 'RUB' },
            { from: 23714559, to: 68660852, value: 80, currency: 'RUB' },
            { from: 23714559, to: 132688541, value: 60, currency: 'RUB' },
            { from: 434266681, to: 25046098, value: 200, currency: 'RUB' },
            { from: 132688541, to: 25046098, value: 140, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 120, currency: 'RUB' },
            { from: 434266681, to: 68660852, value: 80, currency: 'RUB' },
            { from: 434266681, to: 132688541, value: 60, currency: 'RUB' },
            { from: 132688541, to: 68660852, value: 20, currency: 'RUB' },
        ]);
    });

    it('Несколько покупок и несколько пользователей. Покупают все. Не все участвуют', () => {
        const bogdanResult = getDebtList(mock.purchases3, 25046098);
        const stasResult = getDebtList(mock.purchases3, 68660852);
        const dashaResult = getDebtList(mock.purchases3, 132688541);
        const eliseyResult = getDebtList(mock.purchases3, 434266681);
        const iliyaResult = getDebtList(mock.purchases3, 23714559);

        expect(bogdanResult).toEqual([
            { from: 434266681, to: 25046098, value: 750, currency: 'RUB' },
            { from: 132688541, to: 25046098, value: 715, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 675, currency: 'RUB' },
            { from: 25046098, to: 23714559, value: 500, currency: 'RUB' },
            { from: 434266681, to: 23714559, value: 500, currency: 'RUB' },
            { from: 68660852, to: 23714559, value: 300, currency: 'RUB' },
            { from: 23714559, to: 132688541, value: 160, currency: 'RUB' },
            { from: 434266681, to: 68660852, value: 75, currency: 'RUB' },
            { from: 132688541, to: 68660852, value: 40, currency: 'RUB' },
            { from: 434266681, to: 132688541, value: 35, currency: 'RUB' },
        ]);
        expect(stasResult).toEqual([
            { from: 434266681, to: 68660852, value: 75, currency: 'RUB' },
            { from: 132688541, to: 68660852, value: 40, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 675, currency: 'RUB' },
            { from: 68660852, to: 23714559, value: 300, currency: 'RUB' },
            { from: 434266681, to: 25046098, value: 750, currency: 'RUB' },
            { from: 132688541, to: 25046098, value: 715, currency: 'RUB' },
            { from: 25046098, to: 23714559, value: 500, currency: 'RUB' },
            { from: 434266681, to: 23714559, value: 500, currency: 'RUB' },
            { from: 23714559, to: 132688541, value: 160, currency: 'RUB' },
            { from: 434266681, to: 132688541, value: 35, currency: 'RUB' },
        ]);
        expect(dashaResult).toEqual([
            { from: 23714559, to: 132688541, value: 160, currency: 'RUB' },
            { from: 434266681, to: 132688541, value: 35, currency: 'RUB' },
            { from: 132688541, to: 25046098, value: 715, currency: 'RUB' },
            { from: 132688541, to: 68660852, value: 40, currency: 'RUB' },
            { from: 434266681, to: 25046098, value: 750, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 675, currency: 'RUB' },
            { from: 25046098, to: 23714559, value: 500, currency: 'RUB' },
            { from: 434266681, to: 23714559, value: 500, currency: 'RUB' },
            { from: 68660852, to: 23714559, value: 300, currency: 'RUB' },
            { from: 434266681, to: 68660852, value: 75, currency: 'RUB' },
        ]);
        expect(eliseyResult).toEqual([
            { from: 434266681, to: 25046098, value: 750, currency: 'RUB' },
            { from: 434266681, to: 23714559, value: 500, currency: 'RUB' },
            { from: 434266681, to: 68660852, value: 75, currency: 'RUB' },
            { from: 434266681, to: 132688541, value: 35, currency: 'RUB' },
            { from: 132688541, to: 25046098, value: 715, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 675, currency: 'RUB' },
            { from: 25046098, to: 23714559, value: 500, currency: 'RUB' },
            { from: 68660852, to: 23714559, value: 300, currency: 'RUB' },
            { from: 23714559, to: 132688541, value: 160, currency: 'RUB' },
            { from: 132688541, to: 68660852, value: 40, currency: 'RUB' },
        ]);
        expect(iliyaResult).toEqual([
            { from: 25046098, to: 23714559, value: 500, currency: 'RUB' },
            { from: 434266681, to: 23714559, value: 500, currency: 'RUB' },
            { from: 68660852, to: 23714559, value: 300, currency: 'RUB' },
            { from: 23714559, to: 132688541, value: 160, currency: 'RUB' },
            { from: 434266681, to: 25046098, value: 750, currency: 'RUB' },
            { from: 132688541, to: 25046098, value: 715, currency: 'RUB' },
            { from: 68660852, to: 25046098, value: 675, currency: 'RUB' },
            { from: 434266681, to: 68660852, value: 75, currency: 'RUB' },
            { from: 132688541, to: 68660852, value: 40, currency: 'RUB' },
            { from: 434266681, to: 132688541, value: 35, currency: 'RUB' },
        ]);
    });

    it('Базовый расчет. Покупают несколько и никто никому не должен', () => {
        const bogdanResult = getDebtList(mock.purchases4, 25046098);
        const stasResult = getDebtList(mock.purchases4, 68660852);
        const dashaResult = getDebtList(mock.purchases4, 132688541);
        const eliseyResult = getDebtList(mock.purchases4, 434266681);
        const iliyaResult = getDebtList(mock.purchases4, 23714559);

        expect(bogdanResult).toEqual([]);
        expect(stasResult).toEqual([]);
        expect(dashaResult).toEqual([]);
        expect(eliseyResult).toEqual([]);
        expect(iliyaResult).toEqual([]);
    });
});
