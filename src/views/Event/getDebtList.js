import compose from '@tinkoff/utils/function/compose';
import filter from '@tinkoff/utils/array/filter';
import flatten from '@tinkoff/utils/array/flatten';
import map from '@tinkoff/utils/array/map';
import sort from '@tinkoff/utils/array/sort';

const round = (value) => Number(value.toFixed(2));

const getDebtsFromPurchases = (purchases) =>
    purchases.map(({ creatorId, participants, value, currency }) => {
        const averageSum = round(value / participants.length);

        return participants.map((participantId) => ({
            from: participantId,
            to: creatorId,
            value: averageSum,
            currency,
        }));
    });

const unionDebts = (debts) =>
    Object.entries(
        debts.reduce((memo, { from, to, value, currency }) => {
            const userFrom = from > to ? from : to;
            const userTo = from > to ? to : from;
            const key = [userFrom, userTo];
            const { value: currentValue = 0 } = memo[key] || {};

            return {
                ...memo,
                [key]: {
                    from: userFrom,
                    to: userTo,
                    currency,
                    value: (from > to ? value : -value) + currentValue,
                },
            };
        }, {})
    ).map(([, value]) => value);

export default (purchases, currentUserId, transfers = []) =>
    compose(
        sort((a, b) => {
            if (a.to === currentUserId && b.to === currentUserId) {
                return b.value - a.value;
            }

            if (a.to === currentUserId) {
                return -1;
            }

            if (b.to === currentUserId) {
                return 1;
            }

            if (a.from === currentUserId && b.from === currentUserId) {
                return b.value - a.value;
            }

            if (a.from === currentUserId) {
                return -1;
            }

            if (b.from === currentUserId) {
                return 1;
            }

            return b.value - a.value;
        }),
        map(({ from, to, currency, value }) => {
            if (value < 0) {
                return {
                    from: to,
                    to: from,
                    currency,
                    value: -value,
                };
            }

            return {
                from,
                to,
                currency,
                value,
            };
        }),
        filter(({ from, to, value }) => from !== to && value !== 0),
        (purchases) =>
            unionDebts([
                ...purchases,
                ...transfers.map(({ from, to, ...rest }) => ({ ...rest, from: to, to: from })),
            ]),
        flatten,
        getDebtsFromPurchases
    )(purchases);
