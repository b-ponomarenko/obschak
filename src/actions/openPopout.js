import { setPopout } from '../reducers/popout';
import { store } from '../index';
import navigateTo from './navigateTo';

export default ({ name: popout, payload, replace }) => (dispatch) => {
    const { name, params } = store.getState().router.route;

    dispatch(setPopout({ payload }));
    return dispatch(navigateTo(name, { ...params, popout, modal: undefined }, { replace }));
};
