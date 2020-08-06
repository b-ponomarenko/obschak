import { makeEventsRequest } from '../../core/makeRequest';

export default (joinLink) => () =>
    makeEventsRequest({
        method: `join/${joinLink}/generate`,
        httpMethod: 'POST',
    });
