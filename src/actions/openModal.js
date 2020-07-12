import { setModal } from '../reducers/modals';
import { store } from '../index';
import navigateTo from './navigateTo';

export default ({ name: modal, payload }) => (dispatch) => {
    const { name, params } = store.getState().router.route;

    dispatch(setModal({ payload }));
    return dispatch(navigateTo(name, { ...params, modal }));
};
