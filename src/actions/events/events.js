import { makeEventsRequest } from '../../core/makeRequest';
import { eventsLoaded } from '../../reducers/events';
import tap from '@tinkoff/utils/function/tap';

export default () => (dispatch) =>
    makeEventsRequest({ method: 'events' }).then(
        tap(({ events }) => dispatch(eventsLoaded(events)))
    );
