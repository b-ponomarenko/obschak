import { connect } from 'react-redux';
import CreateEventPure from './CreateEventPure';
import getFriends from '../../actions/vk/getFriends';
import openModal from '../../actions/openModal';
import navigateTo from '../../actions/navigateTo';
import openPopout from '../../actions/openPopout';
import createEvent from '../../actions/events/createEvent';
import currentUser from '../../selectors/currentUser';
import { hideSpinner, showSpinner } from '../../actions/spinner';

const mapState = ({ user, vk }) => ({
    user: currentUser({ vk, user }),
});

const mapContext = (dispatch) => ({
    fetchFriends: (q) => dispatch(getFriends({ q })),
    openModal: ({ name, payload }) => dispatch(openModal({ name, payload })),
    openPopout: ({ name, payload }) => dispatch(openPopout({ name, payload })),
    navigateTo: (...args) => dispatch(navigateTo(...args)),
    createEvent: (payload) => dispatch(createEvent(payload)),
    showSpinner: () => dispatch(showSpinner()),
    hideSpinner: () => dispatch(hideSpinner()),
});

export default connect(mapState, mapContext)(CreateEventPure);
