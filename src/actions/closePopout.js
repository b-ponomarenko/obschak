import { store } from '../index';

export default () => () => {
    const { params } = store.getState().router.route;
    const { popout } = params;

    if (popout) {
        return window.history.back();
    }
};
