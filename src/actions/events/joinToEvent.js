import { makeEventsRequest } from '../../core/makeRequest';

export default (join) => () =>
    makeEventsRequest({
        method: `join/${join}`,
        httpMethod: 'POST',
    });
