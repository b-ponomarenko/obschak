const round = (value) => Number(value.toFixed(2));

export default (purchases = [], currentUserId) =>
    Object.entries(
        purchases.reduce((memo, { creatorId, participants, value, currency }) => {
            const averageSum = round(value / participants.length);

            return participants.reduce((memo, participantId) => {
                const from = participantId > creatorId ? participantId : creatorId;
                const to = participantId > creatorId ? creatorId : participantId;
                const value = participantId > creatorId ? averageSum : -averageSum;
                const key = [from, to];
                const { value: currentValue = 0 } = memo[key] || {};

                return { ...memo, [key]: { currency, value: value + currentValue } };
            }, memo);
        }, {})
    )
        .map(([key, value]) => {
            const [from, to] = key.split(',').map(Number);

            return {
                ...value,
                from,
                to,
            };
        })
        .filter(({ from, to, value }) => from !== to && value !== 0)
        .map(({ from, to, currency, value }) => {
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
        })
        .sort((a, b) => {
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
        });
