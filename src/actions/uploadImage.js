import { makeEventsRequest } from '../core/makeRequest';

export default (image) => (dispatch) => {
    const body = new FormData();

    body.append('image', image);

    return makeEventsRequest({
        method: 'upload',
        httpMethod: 'POST',
        payload: body,
        type: 'multipart/form-data',
    });
};
