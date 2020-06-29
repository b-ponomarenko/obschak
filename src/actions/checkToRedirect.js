import { decodeBase64 } from '../utils/base64';
import navigateTo from './navigateTo';

export default () => (dispatch) => {
    if (!window.location.hash) {
        return;
    }

    try {
        const { route, params } = JSON.parse(decodeBase64(window.location.hash.replace('#', '')));

        return dispatch(navigateTo(route, params));
    } catch (e) {
        return;
    }
};
