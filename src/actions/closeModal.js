import { setModal } from '../reducers/modals';

export default () => (dispatch) => dispatch(setModal({ name: null }));
