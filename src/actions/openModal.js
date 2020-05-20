import { setModal } from '../reducers/modals';

export default ({ name, payload }) => (dispatch) => dispatch(setModal({ name, payload }));
