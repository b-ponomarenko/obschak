import { makeEventsRequest } from '../../core/makeRequest';

export default (eventId) => (dispatch) =>
    makeEventsRequest({
        method: `events/${eventId}`,
        httpMethod: 'DELETE',
    });
