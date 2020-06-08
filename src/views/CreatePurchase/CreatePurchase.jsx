import { connect } from 'react-redux';
import CreatePurchasePure from './CreatePurchasePure';
import navigateTo from '../../actions/navigateTo';
import { compose } from 'redux';
import { withCurrentRoute } from '../../core/router';
import openPopout from '../../actions/openPopout';
import createPurchase from '../../actions/events/createPurchase';
import fetchEventWithUsers from '../../actions/fetchEventWithUsers';

const mapState = ({ event, user }, { route }) => {
    const { eventId } = route.params;

    return {
        event: event[eventId],
        user,
    };
};

const mapDispatch = (dispatch) => ({
    fetchEvent: (id) => dispatch(fetchEventWithUsers(id)),
    navigateTo: (routeName, routeParams) => dispatch(navigateTo(routeName, routeParams)),
    openNotificationPopout: (payload) =>
        dispatch(openPopout({ name: 'NOTIFICATION_POPOUT', payload })),
    createPurchase: (eventId, payload) => dispatch(createPurchase(eventId, payload)),
});

export default compose(withCurrentRoute, connect(mapState, mapDispatch))(CreatePurchasePure);
