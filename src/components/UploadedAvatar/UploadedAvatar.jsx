import { connect } from 'react-redux';
import UploadedAvatarPure from './UploadedAvatarPure';
import openPopout from '../../actions/openPopout';
import uploadImage from '../../actions/uploadImage';

const mapContext = (dispatch) => ({
    openPopout: ({ name, payload }) => dispatch(openPopout({ name, payload })),
    uploadImage: (image) => dispatch(uploadImage(image)),
});

export default connect(undefined, mapContext)(UploadedAvatarPure);
