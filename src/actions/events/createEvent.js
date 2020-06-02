import { makeEventsRequest } from '../../core/makeRequest';

export default (payload) => (dispatch) =>
    makeEventsRequest({
        method: 'events',
        httpMethod: 'POST',
        payload,
    });
