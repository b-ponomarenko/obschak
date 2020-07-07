import { connect } from 'react-redux';
import UploadedAvatarPure from './UploadedAvatarPure';
import openPopout from '../../actions/openPopout';
import uploadImage from '../../actions/uploadImage';
import openSnackbar from '../../actions/openSnackbar';

const mapContext = (dispatch) => ({
    openPopout: ({ name, payload }) => dispatch(openPopout({ name, payload })),
    uploadImage: (image) => dispatch(uploadImage(image)),
    openSnackbar: ({ type, children }) => dispatch(openSnackbar({ type, children })),
});

export default connect(undefined, mapContext)(UploadedAvatarPure);
