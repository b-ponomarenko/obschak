import { makeEventsRequest } from '../../core/makeRequest';

export default (payload) => (dispatch) =>
    makeEventsRequest({
        method: `events/${payload.id}`,
        httpMethod: 'PUT',
        payload,
    });
