import { makeEventsRequest } from '../../core/makeRequest';
import { eventLoaded } from '../../reducers/event';
import tap from '@tinkoff/utils/promise/tap';

export default (payload) => (dispatch) =>
    makeEventsRequest({
        method: 'events',
        httpMethod: 'POST',
        payload,
    }).then(tap(({ event }) => dispatch(eventLoaded(event))));
