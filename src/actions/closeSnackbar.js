import { setSnackbar } from '../reducers/snackbar';

export default () => (dispatch) => dispatch(setSnackbar(null));
