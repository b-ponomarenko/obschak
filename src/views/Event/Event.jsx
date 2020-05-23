import { connect } from 'react-redux';
import EventPure from './EventPure';
import navigateTo from '../../actions/navigateTo';
import openPopout from '../../actions/openPopout';
import eventById from '../../actions/events/eventById';
import openModal from '../../actions/openModal';
import closeModal from '../../actions/closeModal';

const mapState = ({ router, event }) => {
    const { name, params } = router.currentRoute;

    return {
        id: name,
        eventId: params?.eventId,
        event: event[params?.eventId],
    };
};

const mapDispatch = (dispatch) => ({
    fetchEvent: (id) => dispatch(eventById(id)),
    navigateBack: () => dispatch(navigateTo('events')),
    navigateToPurchase: ({ eventId, purchaseId }) =>
        dispatch(navigateTo(`events/${eventId}/${purchaseId}`)),
    showBalanceActions: () => dispatch(openPopout({ name: 'BALANCE_ACTIONS' })),
    showEventMembers: (payload) =>
        dispatch(
            openModal({
                name: 'USERS_MODAL',
                payload: { ...payload, onClose: () => dispatch(closeModal()) },
            })
        ),
});

export default connect(mapState, mapDispatch)(EventPure);
