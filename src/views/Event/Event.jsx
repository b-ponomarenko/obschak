import { connect } from 'react-redux';
import EventPure from './EventPure';
import navigateTo from '../../actions/navigateTo';
import openPopout from '../../actions/openPopout';
import eventById from '../../actions/events/eventById';
import openModal from '../../actions/openModal';
import closeModal from '../../actions/closeModal';
import compose from '@tinkoff/utils/function/compose';
import { withCurrentRoute } from '../../core/router';

const mapState = ({ event }, { route }) => {
    const { params } = route;

    return {
        eventId: params.eventId,
        event: event[params.eventId],
    };
};

const mapDispatch = (dispatch) => ({
    fetchEvent: (id) => dispatch(eventById(id)),
    navigateTo: (routeName, routeParams) => dispatch(navigateTo(routeName, routeParams)),
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
