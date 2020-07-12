import { connect } from 'react-redux';
import compose from '@tinkoff/utils/function/compose';
import PurchasePure from './PurchasePure';
import { withCurrentRoute } from '../../core/router';
import purchaseById from '../../actions/events/purchaseById';
import openPopout from '../../actions/openPopout';
import closePopout from '../../actions/closePopout';
import deletePurchase from '../../actions/events/deletePurchase';
import updatePurchase from '../../actions/events/updatePurchase';
import { hideSpinner, showSpinner } from '../../actions/spinner';

const mapState = ({ purchase, event }, { route }) => {
    const { purchaseId, eventId } = route.params;

    return {
        purchase: purchase[purchaseId],
        event: event[eventId],
    };
};

const mapDispatch = (dispatch) => ({
    updatePurchase: (purchase) => dispatch(updatePurchase(purchase)),
    deletePurchase: (purchaseId) => dispatch(deletePurchase(purchaseId)),
    fetchPurchase: (purchaseId) => dispatch(purchaseById(purchaseId)),
    openPopout: ({ name, payload }) => dispatch(openPopout({ name, payload })),
    closePopout: () => dispatch(closePopout()),
    showSpinner: () => dispatch(showSpinner()),
    hideSpinner: () => dispatch(hideSpinner()),
});

export default compose(withCurrentRoute, connect(mapState, mapDispatch))(PurchasePure);
