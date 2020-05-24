import { actions } from 'redux-router5';

export default (routeName, routeParams) => (dispatch) =>
    dispatch(actions.navigateTo(routeName, routeParams));
