import makeRequest from '../../core/makeRequest';
import { eventLoaded } from '../../reducers/event';

export default (id) => (dispatch) =>
    makeRequest({
        method: `events/${id}`,
    }).then((event) => dispatch(eventLoaded(event)));
