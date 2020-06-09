import { makeEventsRequest } from '../../core/makeRequest';
import tap from '@tinkoff/utils/promise/tap';
import { purchaseLoaded } from '../../reducers/purchase';

export default (id) => (dispatch) =>
    makeEventsRequest({
        method: `purchases/${id}`,
    }).then(tap(({ purchase }) => dispatch(purchaseLoaded(purchase))));
