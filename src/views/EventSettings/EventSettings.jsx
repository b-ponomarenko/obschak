import { connect } from 'react-redux';
import EventSettingsPure from './EventSettingsPure';
import fetchEventWithUsers from '../../actions/fetchEventWithUsers';
import { compose } from 'redux';
import { withCurrentRoute } from '../../core/router';
import openPopout from '../../actions/openPopout';
import currentUser from '../../selectors/currentUser';
import getFriends from '../../actions/vk/getFriends';
import openModal from '../../actions/openModal';
import getUsers from '../../actions/vk/getUsers';
import updateEvent from '../../actions/events/updateEvent';
import closePopout from '../../actions/closePopout';
import events from '../../actions/events/events';
import deleteEvent from '../../actions/events/deleteEvent';
import { hideSpinner, showSpinner } from '../../actions/spinner';
import { withPlatform } from '@vkontakte/vkui';
import getJoinLink from '../../actions/events/getJoinLink';
import copyTextToClipboard from '../../actions/vk/copyTextToClipboard';
import openSnackbar from '../../actions/openSnackbar';
import resetJoinLink from '../../actions/events/resetJoinLink';

const mapState = ({ event, user, vk }, { route }) => {
    const { params } = route;

    return {
        user,
        currentUser: currentUser({ vk, user }),
        eventId: params.eventId,
        event: event[params.eventId],
        appId: vk.vk_app_id,
    };
};

const mapDispatch = (dispatch) => ({
    getJoinLink: (id) => dispatch(getJoinLink(id)),
    resetJoinLink: (joinLink) => dispatch(resetJoinLink(joinLink)),
    copyTextToClipboard: (text) => dispatch(copyTextToClipboard(text)),
    openSnackbar: (payload) => dispatch(openSnackbar(payload)),
    fetchEvent: (id) => dispatch(fetchEventWithUsers(id)),
    fetchEvents: () => dispatch(events()),
    openAddFriendsModal: (payload) => dispatch(openModal({ name: 'ADD_FRIENDS_MODAL', payload })),
    fetchFriends: (q) => dispatch(getFriends({ q })),
    fetchUsers: (users) => dispatch(getUsers({ users })),
    updateEvent: (payload) => dispatch(updateEvent(payload)),
    openPopout: ({ name, payload }) => dispatch(openPopout({ name, payload })),
    closePopout: () => dispatch(closePopout()),
    deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
    showSpinner: () => dispatch(showSpinner()),
    hideSpinner: () => dispatch(hideSpinner()),
});

export default compose(
    withCurrentRoute,
    withPlatform,
    connect(mapState, mapDispatch)
)(EventSettingsPure);
