import { makeEventsRequest } from '../../core/makeRequest';

export default (eventId, payload) => (dispatch) =>
    makeEventsRequest({
        method: `events/${eventId}/transfers`,
        httpMethod: 'POST',
        payload,
    });
