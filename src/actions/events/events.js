import makeRequest from '../../core/makeRequest';
import { eventsLoaded } from '../../reducers/events';

export default () => (dispatch) =>
    makeRequest('http://192.168.0.101:3000/events').then((events) =>
        dispatch(eventsLoaded(events))
    );
