import makeRequest from '../../core/makeRequest';
import { eventLoaded } from '../../reducers/event';

export default (id) => (dispatch) =>
    makeRequest(`http://192.168.0.101:3000/events/${id}`).then((event) =>
        dispatch(eventLoaded(event))
    );
