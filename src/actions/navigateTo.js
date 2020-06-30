import { actions } from 'redux-router5';
import closeSnackbar from './closeSnackbar';

export default (routeName, routeParams, opts) => (dispatch) => {
    dispatch(closeSnackbar());
    return dispatch(actions.navigateTo(routeName, routeParams, opts));
};
