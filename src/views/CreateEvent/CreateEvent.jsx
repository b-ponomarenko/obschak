import { connect } from 'react-redux';
import CreateEventPure from './CreateEventPure';
import getFriends from '../../actions/vk/getFriends';
import openModal from '../../actions/openModal';
import navigateTo from '../../actions/navigateTo';
import openPopout from '../../actions/openPopout';
import createEvent from '../../actions/events/createEvent';
import currentUser from '../../selectors/currentUser';
import uploadImage from '../../actions/uploadImage';

const mapState = ({ user, vk }) => {
    return {
        user: currentUser({ vk, user }),
    };
};

const mapContext = (dispatch) => ({
    fetchFriends: (search) => dispatch(getFriends(search)),
    openModal: ({ name, payload }) => dispatch(openModal({ name, payload })),
    openPopout: ({ name, payload }) => dispatch(openPopout({ name, payload })),
    navigateBack: () => dispatch(navigateTo('events')),
    navigateToEvent: (eventId) => dispatch(navigateTo('event', { eventId })),
    createEvent: (payload) => dispatch(createEvent(payload)),
    uploadImage: (image) => dispatch(uploadImage(image)),
});

export default connect(mapState, mapContext)(CreateEventPure);
