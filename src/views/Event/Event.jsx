import { connect } from 'react-redux';
import EventPure from './EventPure';
import navigateTo from '../../actions/navigateTo';
import openPopout from '../../actions/openPopout';
import openModal from '../../actions/openModal';
import closeModal from '../../actions/closeModal';
import compose from '@tinkoff/utils/function/compose';
import { withCurrentRoute } from '../../core/router';
import fetchEventWithUsers from '../../actions/fetchEventWithUsers';
import closePopout from '../../actions/closePopout';

const mapState = ({ event, user }, { route }) => {
    const { params } = route;

    return {
        user,
        eventId: params.eventId,
        event: event[params.eventId],
    };
};

const mapDispatch = (dispatch) => ({
    fetchEvent: (id) => dispatch(fetchEventWithUsers(id)),
    navigateTo: (routeName, routeParams) => dispatch(navigateTo(routeName, routeParams)),
    showLoader: () => dispatch(openPopout({ name: 'SCREEN_SPINNER' })),
    closePopout: () => dispatch(closePopout()),
    showBalanceActions: () => dispatch(openPopout({ name: 'BALANCE_ACTIONS' })),
    showEventMembers: (payload) =>
        dispatch(
            openModal({
                name: 'USERS_MODAL',
                payload: { ...payload, onClose: () => dispatch(closeModal()) },
            })
        ),
});

export default compose(withCurrentRoute, connect(mapState, mapDispatch))(EventPure);
