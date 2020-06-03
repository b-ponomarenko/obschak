import { makeEventsRequest } from '../../core/makeRequest';

export default (eventId, payload) => (dispatch) =>
    makeEventsRequest({ method: `events/${eventId}/purchases`, httpMethod: 'POST', payload });
