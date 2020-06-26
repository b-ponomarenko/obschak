import { connect } from 'react-redux';
import PurchaseFormPure from './PurchaseFormPure';
import openPopout from '../../actions/openPopout';
import openModal from '../../actions/openModal';
import uploadImage from '../../actions/uploadImage';
import showFullImages from '../../actions/vk/showFullImages';
import { hideSpinner, showSpinner } from '../../actions/spinner';

const mapState = ({ user }) => ({ user });

const mapDispatch = (dispatch) => ({
    openNotificationPopout: (payload) =>
        dispatch(openPopout({ name: 'NOTIFICATION_POPOUT', payload })),
    openModal: ({ name, payload }) => dispatch(openModal({ name, payload })),
    uploadImage: (image) => dispatch(uploadImage(image)),
    showFullImages: (payload) => dispatch(showFullImages(payload)),
    showSpinner: () => dispatch(showSpinner()),
    hideSpinner: () => dispatch(hideSpinner()),
});

export default connect(mapState, mapDispatch)(PurchaseFormPure);
