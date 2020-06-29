import { actions } from 'redux-router5';

export default (routeName, routeParams, opts) => (dispatch) =>
    dispatch(actions.navigateTo(routeName, routeParams, opts));
