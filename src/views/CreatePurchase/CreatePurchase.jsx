import { connect } from 'react-redux';
import CreatePurchasePure from './CreatePurchasePure';
import navigateTo from '../../actions/navigateTo';
import { compose } from 'redux';
import { withCurrentRoute } from '../../core/router';
import createPurchase from '../../actions/events/createPurchase';
import fetchEventWithUsers from '../../actions/fetchEventWithUsers';
import currentUser from '../../selectors/currentUser';
import { hideSpinner, showSpinner } from '../../actions/spinner';
import { withSwipeBack } from '../../hooks/useBack';

const mapState = ({ event, user, vk }, { route }) => {
    const { eventId } = route.params;

    return {
        event: event[eventId],
        currentUser: currentUser({ vk, user }),
    };
};

const mapDispatch = (dispatch) => ({
    fetchEvent: (id) => dispatch(fetchEventWithUsers(id)),
    navigateTo: (routeName, routeParams) => dispatch(navigateTo(routeName, routeParams)),
    createPurchase: (eventId, payload) => dispatch(createPurchase(eventId, payload)),
    showSpinner: () => dispatch(showSpinner()),
    hideSpinner: () => dispatch(hideSpinner()),
});

export default compose(
    withCurrentRoute,
    withSwipeBack,
    connect(mapState, mapDispatch)
)(CreatePurchasePure);
