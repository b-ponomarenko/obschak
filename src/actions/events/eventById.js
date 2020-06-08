import { makeEventsRequest } from '../../core/makeRequest';
import { eventLoaded } from '../../reducers/event';
import tap from '@tinkoff/utils/promise/tap';

export default (id) => (dispatch) =>
    makeEventsRequest({
        method: `events/${id}`,
    }).then(tap(({ event }) => dispatch(eventLoaded(event))));
