import { makeEventsRequest } from '../../core/makeRequest';
import { eventLoaded } from '../../reducers/event';
import tap from '@tinkoff/utils/function/tap';

export default (payload) => (dispatch) =>
    makeEventsRequest({
        method: `events/${payload.id}`,
        httpMethod: 'PUT',
        payload,
    }).then(tap(({ event }) => dispatch(eventLoaded(event))));
