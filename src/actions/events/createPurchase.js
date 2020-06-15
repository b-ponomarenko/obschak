import { makeEventsRequest } from '../../core/makeRequest';
import { purchaseLoaded } from '../../reducers/purchase';
import tap from '@tinkoff/utils/promise/tap';

export default (eventId, payload) => (dispatch) =>
    makeEventsRequest({
        method: `events/${eventId}/purchases`,
        httpMethod: 'POST',
        payload,
    }).then(tap(({ purchase }) => dispatch(purchaseLoaded(purchase))));
