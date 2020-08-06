import { makeEventsRequest } from '../../core/makeRequest';

export default (eventId) => () =>
    makeEventsRequest({
        method: `join/${eventId}`,
    });
