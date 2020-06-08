import { connect } from 'react-redux';
import EventSettingsPure from './EventSettingsPure';
import navigateTo from '../../actions/navigateTo';
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

const mapState = ({ event, user, vk }, { route }) => {
    const { params } = route;

    return {
        user,
        currentUser: currentUser({ vk, user }),
        eventId: params.eventId,
        event: event[params.eventId],
    };
};

const mapDispatch = (dispatch) => ({
    navigateTo: (routeName, routeParams) => dispatch(navigateTo(routeName, routeParams)),
    fetchEvent: (id) => dispatch(fetchEventWithUsers(id)),
    fetchEvents: () => dispatch(events()),
    openEventSettingsPopout: (payload) =>
        dispatch(openPopout({ name: 'EVENT_SETTINGS_POPOUT', payload })),
    openAddFriendsModal: (payload) => dispatch(openModal({ name: 'ADD_FRIENDS_MODAL', payload })),
    fetchFriends: (search) => dispatch(getFriends(search)),
    fetchUsers: (users) => dispatch(getUsers({ users })),
    updateEvent: (payload) => dispatch(updateEvent(payload)),
    openPopout: ({ name, payload }) => dispatch(openPopout({ name, payload })),
    closePopout: () => dispatch(closePopout()),
    deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
});

export default compose(withCurrentRoute, connect(mapState, mapDispatch))(EventSettingsPure);
