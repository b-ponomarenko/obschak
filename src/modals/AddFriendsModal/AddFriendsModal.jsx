import { connect } from 'react-redux';
import AddFriendsModalPure from './AddFriendsModalPure';
import closeModal from '../../actions/closeModal';

const mapContext = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
});

export default connect(undefined, mapContext)(AddFriendsModalPure);
