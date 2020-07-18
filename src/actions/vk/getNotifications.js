import { bridge } from '../../core/bridge';
import { setNotifications } from '../../reducers/notifications';
import { store } from '../../index';

export default () => (dispatch) => {
    const { vk_user_id } = store.getState().vk;

    return bridge
        .send('VKWebAppCallAPIMethod', {
            method: 'apps.isNotificationsAllowed',
            params: {
                v: process.env.REACT_APP_VK_API_V,
                access_token: process.env.REACT_APP_SERVICE_KEY,
                user_id: vk_user_id,
            },
        })
        .then(({ response: { is_allowed } }) => dispatch(setNotifications({ all: is_allowed })));
};
