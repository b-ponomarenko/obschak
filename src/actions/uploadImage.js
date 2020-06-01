import makeRequest from '../core/makeRequest';

export default (image) => (dispatch) => {
    const body = new FormData();

    body.append('image', image);

    return makeRequest(`${process.env.REACT_APP_EVENTS_API}/upload`, {
        method: 'POST',
        body,
        mode: 'cors',
    });
};
