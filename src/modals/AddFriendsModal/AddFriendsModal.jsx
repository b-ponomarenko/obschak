import { connect } from 'react-redux';
import AddFriendsModalPure from './AddFriendsModalPure';
import closeModal from '../../actions/closeModal';
import getFriends from '../../actions/vk/getFriends';

const mapContext = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    fetchMoreFriends: (payload) => dispatch(getFriends(payload)),
});

export default connect(undefined, mapContext)(AddFriendsModalPure);
