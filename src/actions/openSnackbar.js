import { setSnackbar } from '../reducers/snackbar';

export default (snackbar) => (dispatch) => dispatch(setSnackbar(snackbar));
