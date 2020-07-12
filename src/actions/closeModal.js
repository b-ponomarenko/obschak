import { store } from '../index';

export default () => () => {
    const { params } = store.getState().router.route;
    const { modal } = params;

    if (modal) {
        return window.history.back();
    }
};
