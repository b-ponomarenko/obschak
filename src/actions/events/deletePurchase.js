import { makeEventsRequest } from '../../core/makeRequest';

export default (purchaseId) => (dispatch) =>
    makeEventsRequest({
        method: `purchases/${purchaseId}`,
        httpMethod: 'DELETE',
    });
