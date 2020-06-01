import makeRequest from '../../core/makeRequest';

export default (payload) => (dispatch) =>
    makeRequest(`${process.env.REACT_APP_EVENTS_API}/events`, {
        method: 'POST',
        body: JSON.stringify(payload),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    });
