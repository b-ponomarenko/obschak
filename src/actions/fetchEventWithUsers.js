import eventById from './events/eventById';
import getUsers from './vk/getUsers';

export default (eventId) => (dispatch) =>
    dispatch(eventById(eventId)).then(({ event }) => dispatch(getUsers({ users: event.users })));
