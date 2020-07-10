import { decodeBase64 } from '../utils/base64';
import navigateTo from './navigateTo';
import openSnackbar from './openSnackbar';

export default () => (dispatch) => {
    if (!window.location.hash) {
        return;
    }

    try {
        const { route, params } = JSON.parse(decodeBase64(window.location.hash.replace('#', '')));

        return dispatch(navigateTo(route, params));
    } catch (e) {
        return dispatch(
            openSnackbar({ type: 'error', children: 'Вы перешли по невалидной ссылке' })
        );
    }
};
