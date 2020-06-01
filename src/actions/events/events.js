import makeRequest from '../../core/makeRequest';
import { eventsLoaded } from '../../reducers/events';

export default () => (dispatch) =>
    makeRequest(`${process.env.REACT_APP_EVENTS_API}/events`).then((events) =>
        dispatch(eventsLoaded(events))
    );
