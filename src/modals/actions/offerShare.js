import { bridge } from '../../core/bridge';
import openModal from '../../actions/openModal';
import events from '../../actions/events/events';
import { isBefore, isEqual, subDays, startOfDay } from 'date-fns';

export default () => (dispatch) =>
    bridge
        .send('VKWebAppStorageGet', { keys: ['isShareOffered'] })
        .then(({ keys: [{ value }] }) => {
            if (value) {
                return;
            }

            return dispatch(events());
        })
        .then((payload) => {
            if (!payload) {
                return;
            }

            const { events } = payload;
            const dayBeforeYesterday = startOfDay(subDays(new Date(), 2));
            const pastEvent = events
                .sort((a, b) => (b.endDate > a.endDate ? 1 : -1))
                .find(({ endDate }) => {
                    const d1 = startOfDay(new Date(endDate));

                    return isBefore(d1, dayBeforeYesterday) || isEqual(d1, dayBeforeYesterday);
                });

            if (pastEvent) {
                dispatch(openModal({ name: 'SHARE_OFFER_CARD', payload: pastEvent }));
                bridge.send('VKWebAppStorageSet', { key: 'isShareOffered', value: 'true' });
            }
        });
