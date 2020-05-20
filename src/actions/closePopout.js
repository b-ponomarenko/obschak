import { setPopout } from '../reducers/popout';

export default () => (dispatch) => dispatch(setPopout({ name: null }));
