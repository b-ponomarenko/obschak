import { makeEventsRequest } from '../../core/makeRequest';
import { eventLoaded } from '../../reducers/event';

export default (id) => (dispatch) =>
    makeEventsRequest({
        method: `events/${id}`,
    }).then(({ event }) => dispatch(eventLoaded(event)));
