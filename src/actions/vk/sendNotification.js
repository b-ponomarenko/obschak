import { store } from '../../index';
import { bridge } from '../../core/bridge';

export default ({ userId, message }) => (dispatch) => {
    const { vk_user_id } = store.getState().vk;

    bridge
        .send('VKWebAppCallAPIMethod', {
            method: 'apps.isNotificationsAllowed',
            params: {
                user_id: userId,
                access_token: process.env.REACT_APP_SERVICE_KEY,
                v: process.env.REACT_APP_VK_API_V,
            },
        })
        .then(({ response }) => {
            if (!response.is_allowed) {
                return;
            }

            bridge.send('VKWebAppCallAPIMethod', {
                method: 'notifications.sendMessage',
                params: {
                    user_ids: userId,
                    message,
                    v: process.env.REACT_APP_VK_API_V,
                    access_token: process.env.REACT_APP_SERVICE_KEY,
                },
            });
        });
};
