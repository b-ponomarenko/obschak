import { actions } from 'redux-router5';
import closeSnackbar from './closeSnackbar';
import { store } from '../index';
import { stringify } from 'query-string';

export default (routeName, routeParams, opts) => (dispatch) => {
    const { vk } = store.getState();

    dispatch(closeSnackbar());
    dispatch(actions.navigateTo(routeName, routeParams, opts));
    window.history.replaceState(
        window.history.state,
        '',
        `${window.history.state.path}?${stringify(vk)}`
    );
};
