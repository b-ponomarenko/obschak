import makeRequest from '../../core/makeRequest';
import { eventLoaded } from '../../reducers/event';

export default (id) => (dispatch) =>
    makeRequest(`http://localhost:3000/events/${id}`).then((event) => dispatch(eventLoaded(event)));
