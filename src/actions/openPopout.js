import { setPopout } from '../reducers/popout';

export default ({ name, payload }) => (dispatch) => dispatch(setPopout({ name, payload }));
