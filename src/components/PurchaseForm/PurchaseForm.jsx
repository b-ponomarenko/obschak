import { connect } from 'react-redux';
import PurchaseFormPure from './PurchaseFormPure';
import openPopout from '../../actions/openPopout';
import openModal from '../../actions/openModal';

const mapState = ({ user }) => ({ user });

const mapDispatch = (dispatch) => ({
    openNotificationPopout: (payload) =>
        dispatch(openPopout({ name: 'NOTIFICATION_POPOUT', payload })),
    openModal: ({ name, payload }) => dispatch(openModal({ name, payload })),
});

export default connect(mapState, mapDispatch)(PurchaseFormPure);
