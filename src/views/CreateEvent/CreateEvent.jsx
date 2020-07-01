import { connect } from 'react-redux';
import CreateEventPure from './CreateEventPure';
import getFriends from '../../actions/vk/getFriends';
import openModal from '../../actions/openModal';
import navigateTo from '../../actions/navigateTo';
import openPopout from '../../actions/openPopout';
import createEvent from '../../actions/events/createEvent';
import currentUser from '../../selectors/currentUser';
import uploadImage from '../../actions/uploadImage';
import { hideSpinner, showSpinner } from '../../actions/spinner';
import { withSwipeBack } from '../../hooks/useBack';
import compose from '@tinkoff/utils/function/compose';

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
    createEvent: (payload) => dispatch(createEvent(payload)),
    uploadImage: (image) => dispatch(uploadImage(image)),
    showSpinner: () => dispatch(showSpinner()),
    hideSpinner: () => dispatch(hideSpinner()),
});

export default compose(withSwipeBack, connect(mapState, mapContext))(CreateEventPure);
