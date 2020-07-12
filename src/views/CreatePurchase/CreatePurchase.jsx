import { connect } from 'react-redux';
import CreatePurchasePure from './CreatePurchasePure';
import { compose } from 'redux';
import { withCurrentRoute } from '../../core/router';
import createPurchase from '../../actions/events/createPurchase';
import fetchEventWithUsers from '../../actions/fetchEventWithUsers';
import currentUser from '../../selectors/currentUser';
import { hideSpinner, showSpinner } from '../../actions/spinner';

const mapState = ({ event, user, vk }, { route }) => {
    const { eventId } = route.params;

    return {
        event: event[eventId],
        currentUser: currentUser({ vk, user }),
    };
};

const mapDispatch = (dispatch) => ({
    fetchEvent: (id) => dispatch(fetchEventWithUsers(id)),
    createPurchase: (eventId, payload) => dispatch(createPurchase(eventId, payload)),
    showSpinner: () => dispatch(showSpinner()),
    hideSpinner: () => dispatch(hideSpinner()),
});

export default compose(withCurrentRoute, connect(mapState, mapDispatch))(CreatePurchasePure);
