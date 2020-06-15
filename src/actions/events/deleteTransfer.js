import { makeEventsRequest } from '../../core/makeRequest';

export default (transferId) => (dispatch) =>
    makeEventsRequest({
        method: `transfers/${transferId}`,
        httpMethod: 'DELETE',
    });
