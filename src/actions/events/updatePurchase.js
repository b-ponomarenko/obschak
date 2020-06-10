import { makeEventsRequest } from '../../core/makeRequest';
import { purchaseLoaded } from '../../reducers/purchase';
import tap from '@tinkoff/utils/function/tap';

export default (payload) => (dispatch) =>
    makeEventsRequest({
        method: `purchases/${payload.id}`,
        httpMethod: 'PUT',
        payload,
    }).then(tap(({ purchase }) => dispatch(purchaseLoaded(purchase))));
